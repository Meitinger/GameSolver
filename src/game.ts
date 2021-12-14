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

import Ajv, { JSONSchemaType } from 'ajv'
import * as Comlink from 'comlink'
import { MultiDirectedGraph } from 'graphology'
import { SerializedGraph } from 'graphology-types'

const ajv = new Ajv()

export interface PlayerInfo {
    name: string
    color: string
}

export abstract class Game {
    public abstract load(data: string): void
    public abstract solve(cb: (graph: SerializedGraph) => void, interval: number): string[]
    public abstract render(state: string, width: number, height: number): ImageBitmap
    public abstract renderFallback(state: string, canvas: HTMLCanvasElement): void
}

interface NodeAttributes {
    x: number
    y: number
    label: string
    winning: Set<number>
    color: string
    size: number
}

interface EdgeAttributes {
    player: number
    color: string
    size: number
}

export type RenderingContext = CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D

export abstract class TypedGame<Setup, State> extends Game {
    private setup?: Setup

    public load(data: string): void {
        try {
            const setup: unknown = JSON.parse(data)
            if (!ajv.validate(this.schema, setup)) {
                throw new Error(ajv.errorsText(ajv.errors))
            }
            this.setup = setup
        } catch (error) {
            delete this.setup
            throw error
        }
    }

    private calculateStrategy(graph: MultiDirectedGraph<NodeAttributes, EdgeAttributes>, initialNode: string, player: number): boolean {
        const nodesNotInW = new Map<string, number>()
        const nodesToBeMovedToW = new Set<string>()
        // initialize in O(|e| + |v|)
        graph.forEachNode((node, attributes) => { // go over each node
            if (attributes.winning.has(player)) {
                nodesToBeMovedToW.add(node) // queue node for later
            } else {
                // NB: we don't consider getting stuck as losing (or winning for the others) automatically but leave it up to the game
                nodesNotInW.set(
                    node,
                    graph.reduceOutEdges( // go over each node's outgoing edge (necessary to calculate the out-degree)
                        node,
                        (v, _, attributes) => attributes.player === player ? v : (v + 1), 0
                    )
                )
            }
        })
        const nodesInW = new Set<string>()
        const strategyEdges = new Set<string>() // used for output, not part of the solving algorithm
        // fix-point algorithm in O(|e| + |v|)
        while (nodesToBeMovedToW.size > 0) {
            for (const node of nodesToBeMovedToW) { // go over each node in the queue
                nodesToBeMovedToW.delete(node)
                console.assert(!nodesInW.has(node)) // no node is visited twice
                nodesInW.add(node)
                graph.forEachInEdge(node, (edge, attributes, sourceNode) => { // go over each node's incoming edge
                    if (attributes.player === player) {
                        if (nodesNotInW.delete(sourceNode)) {
                            nodesToBeMovedToW.add(sourceNode)
                            strategyEdges.add(edge)
                        }
                    } else {
                        const v = nodesNotInW.get(sourceNode)
                        if (v !== undefined) {
                            if (v > 1) {
                                nodesNotInW.set(sourceNode, v - 1)
                            } else {
                                nodesNotInW.delete(sourceNode)
                                nodesToBeMovedToW.add(sourceNode)
                            }
                        }
                    }
                })
            }
        }
        // highlight the winning strategy
        if (nodesInW.has(initialNode)) {
            strategyEdges.forEach(edge => graph.setEdgeAttribute(edge, 'size', 3))
            return true
        }
        return false
    }

    public solve(cb: (graph: SerializedGraph) => void, interval: number): string[] {
        let nextTime = new Date().valueOf() + interval
        const graph = new MultiDirectedGraph<NodeAttributes, EdgeAttributes>()
        const players = this.getPlayers()
        const pendingStates = <[number, number, string, State][]>[]
        const callbackIfItsTime = (): void => {
            const currentTime = new Date().valueOf()
            if (currentTime > nextTime) {
                nextTime = currentTime + interval
                cb(graph.export())
            }
        }
        const addState = (x: number, y: number, name: string, state: State): void => {
            const winning = new Set(this.getWinningPlayersFromState(state))
            graph.addNode(name, { x, y, label: name, winning, color: '#aaa', size: winning.size > 0 ? 4 : 2 })
            pendingStates.push([x, y, name, state])
        }
        const initialState = this.getInitialState()
        const initialNode = this.encodeState(initialState)
        addState(0, 0, initialNode, initialState)
        graph.setNodeAttribute(initialNode, 'color', '#000')
        graph.setNodeAttribute(initialNode, 'size', 6)
        while (true) {
            const popped = pendingStates.pop()
            if (popped === undefined) {
                break
            }
            const [x, y, name, state] = popped
            let offset = 0
            for (const [player, nextStates] of this.getNextStates(state)) {
                const playerInfo = players[player]
                if (!playerInfo) {
                    throw new Error(`Player '${player}' is undefined.`)
                }
                for (const nextState of nextStates) {
                    const nextName = this.encodeState(nextState)
                    if (!graph.hasNode(nextName)) {
                        addState(x + 1, y + ++offset, nextName, nextState)
                    }
                    graph.addEdge(name, nextName, { player, color: playerInfo.color, size: 1 })
                }
            }
            callbackIfItsTime()
        }
        const winningPlayers = players.filter((_, i) => {
            if (this.calculateStrategy(graph, initialNode, i)) {
                callbackIfItsTime()
                return true
            } else {
                return false
            }
        })
        cb(graph.export())
        return winningPlayers.map(player => player.name)
    }

    private getRenderingContext(canvas: OffscreenCanvas | HTMLCanvasElement): RenderingContext {
        const ctx = canvas.getContext('2d')
        if (!ctx) {
            throw new Error('Couldn\'t create 2D rendering context.')
        }
        ctx.beginPath()
        ctx.fillStyle = 'white'
        ctx.fillRect(0, 0, canvas.width, canvas.height)
        return ctx
    }

    public render(state: string, width: number, height: number): ImageBitmap {
        const canvas = new OffscreenCanvas(width, height)
        this.renderState(this.decodeState(state), width, height, this.getRenderingContext(canvas))
        const bitmap = canvas.transferToImageBitmap()
        return Comlink.transfer(bitmap, [bitmap])
    }

    public renderFallback(state: string, canvas: HTMLCanvasElement): void {
        this.renderState(this.decodeState(state), canvas.width, canvas.height, this.getRenderingContext(canvas))
    }

    protected getSetup(): Setup {
        if (this.setup === undefined) {
            throw new Error('Game not yet loaded.')
        }
        return this.setup
    }

    protected abstract readonly schema: JSONSchemaType<Setup>
    protected abstract getPlayers(): PlayerInfo[]
    protected abstract encodeState(state: State): string
    protected abstract decodeState(encodedState: string): State
    protected abstract getInitialState(): State
    protected abstract getNextStates(state: State): Iterable<[number, Iterable<State>]>
    protected abstract getWinningPlayersFromState(state: State): Iterable<number>
    protected abstract renderState(state: State, width: number, height: number, ctx: RenderingContext): void
}

export interface GameMetaData {
    label: string
    hasArena: boolean
    instance: Game
    createWorker: () => Worker
    fileName: string
    schema: object
    setup: unknown
}

export interface TypedGameMetaData<T> extends GameMetaData {
    schema: JSONSchemaType<T>
    setup: T
}

export function isWorker(): boolean {
    return typeof importScripts === 'function'
}
