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

import { JSONSchemaType } from 'ajv'
import * as Comlink from 'comlink'
import { PlayerInfo, RenderingContext, TypedGame, isWorker } from './game'

type Player = 'x' | 'o'
type Space = ' ' | Player

export interface Setup {
    board: Space[][]
    start: Player
}

type State = [boolean, number, number] // [is X turn, x checks, o checks]

const PI2 = Math.PI * 2

export const Schema: JSONSchemaType<Setup> = {
    type: 'object',
    properties: {
        board: {
            type: 'array',
            description: 'Specifies the initial board setup, one array per horizontal line.',
            minItems: 3,
            maxItems: 3,
            items: {
                type: 'array',
                description: 'Specifies the three spaces of one horizontal line.',
                minItems: 3,
                maxItems: 3,
                items: {
                    type: 'string',
                    description: '"x" for player X, "o" for player O or " " if no one has marked the space yet.',
                    enum: [' ', 'x', 'o']
                }
            }
        },
        start: {
            type: 'string',
            description: 'Specifies the player who should start, either "x" for player X or "o" for player O.',
            enum: ['x', 'o']
        }
    },
    required: ['board', 'start'],
    additionalProperties: false
}

export class TicTacToe extends TypedGame<Setup, State> {
    protected readonly schema = Schema

    getPlayers(): PlayerInfo[] {
        return [
            {
                name: 'x',
                color: '#0f0'
            },
            {
                name: 'o',
                color: '#f00'
            }
        ]
    }

    protected encodeState(state: State): string {
        const [nextIsX, x, o] = state
        const encodeState = ((nextIsX ? 0x80000 : 0) | (x << 9) | o).toString(16)
        return '0'.repeat(5 - encodeState.length) + encodeState
    }

    protected decodeState(encodedState: string): State {
        const state = parseInt(encodedState, 16)
        return [(state & 0x80000) === 0, (state >> 9) & 0x3FF, state & 0x3FF]
    }

    protected getInitialState(): State {
        const setup = this.getSetup()
        let x = 0
        let o = 0
        setup.board.forEach((line, row) => line.forEach((space, col) => {
            const val = 1 << (row * 3 + col)
            switch (space) {
                case 'o':
                    o |= val
                    break
                case 'x':
                    x |= val
                    break
                case ' ':
                    break
            }
        }))
        return [setup.start === 'x', x, o]
    }

    protected * getNextStates(state: State): Iterable<[number, Iterable<State>]> {
        const [nextIsX, x, o] = state
        if (this.isWinning(x) || this.isWinning(o)) {
            return
        }
        const me = nextIsX ? x : o
        const you = nextIsX ? o : x
        for (let i = 8; i >= 0; i--) {
            const val = 1 << i
            if ((me & val) === 0 && (you & val) === 0) {
                yield nextIsX ? [0, [[false, me | val, you]]] : [1, [[true, you, me | val]]]
            }
        }
    }

    private isWinning(n: number): boolean {
        return (n & 7) === 7 || (n & 56) === 56 || (n & 448) === 448 ||
            (n & 73) === 73 || (n & 146) === 146 || (n & 292) === 292 ||
            (n & 273) === 273 || (n & 84) === 84
    }

    protected * getWinningPlayersFromState(state: State): Iterable<number> {
        const [, x, o] = state
        if (this.isWinning(x)) {
            yield 0
        }
        if (this.isWinning(o)) {
            yield 1
        }
    }

    protected renderState(state: State, width: number, height: number, ctx: RenderingContext): void {
        const size = Math.min(width, height)
        const left = (width - size) / 2
        const top = (height - size) / 2
        const oneThirdSize = size / 3
        const twoThirdsSize = size * 2 / 3
        const oneSixthSize = size / 6
        const radius = size / 12
        ctx.lineWidth = Math.max(size / 72, 1)
        ctx.strokeStyle = 'black'
        ctx.beginPath()
        ctx.moveTo(left, top + oneThirdSize)
        ctx.lineTo(left + size, top + oneThirdSize)
        ctx.stroke()
        ctx.beginPath()
        ctx.moveTo(left, top + twoThirdsSize)
        ctx.lineTo(left + size, top + twoThirdsSize)
        ctx.stroke()
        ctx.beginPath()
        ctx.moveTo(left + oneThirdSize, top)
        ctx.lineTo(left + oneThirdSize, top + size)
        ctx.stroke()
        ctx.beginPath()
        ctx.moveTo(left + twoThirdsSize, top)
        ctx.lineTo(left + twoThirdsSize, top + size)
        ctx.stroke()

        const [, x, o] = state
        for (let row = 0; row < 3; row++) {
            for (let col = 0; col < 3; col++) {
                const flag = 1 << (row * 3 + col)
                const centerX = left + oneSixthSize * (col * 2 + 1)
                const centerY = top + oneSixthSize * (row * 2 + 1)
                if ((x & flag) !== 0) {
                    ctx.strokeStyle = 'green'
                    ctx.beginPath()
                    ctx.moveTo(centerX - radius, centerY - radius)
                    ctx.lineTo(centerX + radius, centerY + radius)
                    ctx.stroke()
                    ctx.beginPath()
                    ctx.moveTo(centerX - radius, centerY + radius)
                    ctx.lineTo(centerX + radius, centerY - radius)
                    ctx.stroke()
                }
                if ((o & flag) !== 0) {
                    ctx.strokeStyle = 'red'
                    ctx.beginPath()
                    ctx.ellipse(centerX, centerY, radius, radius, 0, 0, PI2)
                    ctx.stroke()
                }
            }
        }
    }
}

isWorker() && Comlink.expose(new TicTacToe())
