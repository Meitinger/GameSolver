/*
 * Visual Solver for Decision Games
 * Copyright (C) 2021  Manuel Meitinger
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

import * as Comlink from 'comlink'
import { MultiDirectedGraph } from 'graphology'
import { SerializedGraph } from 'graphology-types'
import * as monaco from 'monaco-editor'
import * as React from 'react'
import { useEffect, useMemo, useReducer, useRef, useState } from 'react'
import { ControlsContainer, ForceAtlasControl, SearchControl, SigmaContainer, ZoomControl, useLoadGraph, useRegisterEvents, useSetSettings, useSigma } from 'react-sigma-v2'
import { Game, GameMetaData } from './game'
import { alert, confirm, usePersistedState } from './helpers'
import { Games } from './setup'

const Graph: React.FC<{
    data: SerializedGraph
    hoveredNode: string | null
    setHoveredNode: (node: string | null) => void
    children?: React.ReactNode
}> = ({ data, hoveredNode, setHoveredNode, children }) => {
    const sigma = useSigma()
    const loadGraph = useLoadGraph()
    const setSettings = useSetSettings()
    const registerEvents = useRegisterEvents()

    useEffect(() => {
        const graph = new MultiDirectedGraph()
        graph.import(data)
        loadGraph(graph)
    }, [loadGraph, data])

    useEffect(() => {
        registerEvents({
            enterNode: e => setHoveredNode(e.node),
            leaveNode: () => setHoveredNode(null)
        })
    }, [registerEvents, setHoveredNode])

    useEffect(() => {
        setSettings({
            defaultEdgeType: 'arrow',
            nodeReducer: (node, data) => ({
                ...data,
                highlighted: hoveredNode != null && (node === hoveredNode || sigma.getGraph().hasEdge(hoveredNode, node))
            }),
            edgeReducer: (edge, data) => ({
                ...data,
                hidden: hoveredNode != null && !sigma.getGraph().hasExtremity(edge, hoveredNode)
            })
        })
    }, [setSettings, hoveredNode, sigma])

    return <>{children}</>
}

const Tab: React.FC<{
    name: string
    data: GameMetaData
    visible: boolean
}> = ({ name, data, visible }) => {
    const interval = 5000
    const arenaCanvas = useRef<HTMLCanvasElement>(null)
    const editorDiv = useRef<HTMLDivElement>(null)
    const [thread, killThread] = useReducer((thread: number) => thread + 1, 0)
    const [game, setGame] = useState<Comlink.Remote<Game> | null>(null)
    const [content, setContent] = useState<string>('')
    const [running, setRunning] = useState<boolean>(false)
    const [graph, setGraph] = useState<SerializedGraph | null>(null)
    const [hoveredNode, setHoveredNode] = useState<string | null>(null)

    const solveGame = async (): Promise<void> => {
        if (!game) {
            if (await confirm('Game creation failed. Do you want to retry?')) {
                killThread()
            }
            return
        }
        if (!await new Promise<boolean>(resolve => setRunning(running => { resolve(!running); return true }))) {
            return alert('Another solver is already running.')
        }
        try {
            setGraph(null)
            await game.load(content)
            const winners = await game.solve(Comlink.proxy(setGraph), interval)
            return alert(winners.length === 0 ? 'No winning strategy.' : `Player(s) with winning strategy: ${winners.join(', ')}`)
        } catch (error) {
            return alert(String(error))
        } finally {
            setRunning(false)
        }
    }

    useEffect(() => {
        try {
            const createdWorker = data.createWorker()
            const createdGame = Comlink.wrap<Game>(createdWorker)
            setGame(() => createdGame) // necessary as Remote is callable
            return () => {
                try {
                    console.info(`Killing thread ${thread}.`)
                    createdGame[Comlink.releaseProxy]()
                    createdWorker.terminate()
                } finally {
                    setGame(null)
                }
            }
        } catch (error) {
            alert(String(error)).catch(console.error)
        }
        return undefined
    }, [data, thread])

    useEffect(() => {
        if (!editorDiv.current) {
            alert('Editor DIV not found.').catch(console.error)
            return
        }
        const value = self.localStorage.getItem(name) ?? JSON.stringify(data.setup, null, 2)
        setContent(value)
        const modelUri = monaco.Uri.parse(data.fileName)
        const model = monaco.editor.createModel(value, 'json', modelUri)
        model.onDidChangeContent(() => {
            const value = model.getValue()
            self.localStorage.setItem(name, value)
            setContent(value)
        })
        const editor = monaco.editor.create(editorDiv.current, {
            automaticLayout: true,
            formatOnType: true,
            model
        })
        return () => {
            editor.dispose()
            model.dispose()
        }
    }, [name, data])

    useEffect(() => {
        if (!game || hoveredNode == null || !arenaCanvas.current) {
            return
        }
        const canvas = arenaCanvas.current
        canvas.width = canvas.offsetWidth
        canvas.height = canvas.offsetHeight
        if (typeof OffscreenCanvas === 'function') {
            let cancel = false
            game.render(hoveredNode, canvas.width, canvas.height)
                .then(bitmap => {
                    if (!cancel) {
                        const ctx = canvas.getContext('bitmaprenderer')
                        if (!ctx) {
                            throw new Error('Couldn\'t create bitmap rendering context.')
                        }
                        ctx.transferFromImageBitmap(bitmap)
                    }
                    return undefined
                })
                .catch(console.error)
            return () => { cancel = true }
        } else {
            data.instance.load(content)
            data.instance.renderFallback(hoveredNode, canvas)
            return undefined
        }
    }, [hoveredNode, game, data, content])

    return (
        <div className="uk-grid-divider uk-grid-small uk-flex-nowrap" data-uk-grid>
            <div className={`uk-width-1-${graph ? '3' : '1'}`}>
                <div ref={editorDiv} {...visible && { 'data-uk-height-viewport': 'offset-top: true; offset-bottom: true' }} />
                <nav className="uk-flex uk-flex-bottom uk-navbar-container" data-uk-navbar>
                    <div className="uk-navbar-left">
                        <div className="uk-navbar-item">
                            <button className={`uk-button uk-button-${running ? 'danger' : 'primary'}`} title={running ? 'Abort' : 'Solve'} onClick={() => running ? killThread() : solveGame()}><span data-uk-icon={running ? 'bolt' : 'play'} /></button>
                            <div data-uk-spinner style={{ visibility: running ? 'visible' : 'hidden' }} />
                        </div>
                    </div>
                </nav>
            </div>
            {graph && (
                <div className="uk-width-2-3">
                    <div className="uk-grid-divider uk-grid-small uk-flex-nowrap uk-flex-column uk-height-1-1 uk-width-1-1" data-uk-grid>
                        <div style={{ width: '100%', height: data.hasArena ? '70%' : '100%' }}>
                            <div className="uk-card uk-card-small uk-card-body uk-card-primary" style={{ width: '100%', height: '100%' }}>
                                <SigmaContainer style={{ width: '100%', height: '100%' }}>
                                    <Graph data={graph} hoveredNode={hoveredNode} setHoveredNode={setHoveredNode} />
                                    <ControlsContainer position="bottom-right">
                                        <ZoomControl />
                                        <ForceAtlasControl autoRunFor={interval} />
                                    </ControlsContainer>
                                    <ControlsContainer position="top-right">
                                        <SearchControl />
                                    </ControlsContainer>
                                </SigmaContainer>
                            </div>
                        </div>
                        {data.hasArena && (
                            <div style={{ width: 'calc(100% - 2px)', height: 'calc(30% - 2px)' }}>
                                <canvas ref={arenaCanvas} style={{ width: '100%', height: '100%' }} hidden={hoveredNode == null} />
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}

export const App: React.FC = () => {
    const [selected, setSelected] = usePersistedState<number>('selected', 0, { type: 'number' })
    const selectedTab = useMemo(() => Math.max(0, Math.min(selected, Object.values(Games).length - 1)), [selected])

    return (
        <>
            <ul className="uk-tab">
                {Object.entries(Games).map(([name, data], index) =>
                    <li key={name} className={index === selectedTab ? 'uk-active' : ''}>
                        <a href={`#${name}`} onClick={e => { setSelected(index); e.preventDefault() }}>{data.label}</a>
                    </li>
                )}
            </ul>
            <div className="uk-margin-top">
                {Object.entries(Games).map(([name, data], index) =>
                    <div key={name} id={name} hidden={index !== selectedTab}>
                        <Tab name={name} data={data} visible={index === selectedTab} />
                    </div>
                )}
            </div>
        </>
    )
}
