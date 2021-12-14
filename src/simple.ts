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
import { PlayerInfo, TypedGame, isWorker } from './game'

export interface Setup {
    players: {
        [name: string]: {
            color: string
            moves: { [state: string]: string[] }
            wins: string[]
        }
    },
    start: string
}

type State = string

export const Schema: JSONSchemaType<Setup> = {
    type: 'object',
    properties: {
        players: {
            type: 'object',
            description: 'An associative list of players, where the index is player\' name.',
            patternProperties: {
                '.': {
                    type: 'object',
                    properties: {
                        color: {
                            type: 'string',
                            description: 'The player\'s color, either in short "#rgb" form, long "#rrggbb" form, or with alpha "rgba(rrr,ggg,bbb,aaa)".',
                            pattern: '^(#([a-fA-F0-9]{3}|[a-fA-F0-9]{6})|rgba\\([0-9]+,[0-9]+,[0-9]+,[0-9]+\\))$'
                        },
                        moves: {
                            type: 'object',
                            description: 'An associative list of moves the player can make, where the index specifies the starting state.',
                            patternProperties: {
                                '^': {
                                    type: 'array',
                                    description: 'An unique list of end state the current player can reach from the current start state.',
                                    uniqueItems: true,
                                    items: {
                                        type: 'string'
                                    }
                                }
                            },
                            required: [],
                            additionalProperties: false
                        },
                        wins: {
                            type: 'array',
                            description: 'An unique list of states in which the current player wins.',
                            uniqueItems: true,
                            items: {
                                type: 'string'
                            }
                        }
                    },
                    required: ['color', 'moves', 'wins'],
                    additionalProperties: false
                }
            },
            required: [],
            additionalProperties: false
        },
        start: {
            type: 'string',
            description: 'The name of the initial state in which the game starts.'
        }
    },
    required: ['players', 'start'],
    additionalProperties: false
}

export class Simple extends TypedGame<Setup, State> {
    protected readonly schema = Schema

    getPlayers(): PlayerInfo[] {
        return Object.entries(this.getSetup().players).map(([name, player]) => ({ name, color: player.color }))
    }

    protected encodeState(state: State): string {
        return state
    }

    protected decodeState(encodedState: string): State {
        return encodedState
    }

    protected getInitialState(): State {
        return this.getSetup().start
    }

    protected getNextStates(state: State): Iterable<[number, Iterable<State>]> {
        return Object.values(this.getSetup().players).map((player, index) => [index, player.moves[state] ?? []])
    }

    protected getWinningPlayersFromState(state: State): Iterable<number> {
        return Object.values(this.getSetup().players).reduce<number[]>((result, player, index) => {
            if (player.wins.includes(state)) {
                result.push(index)
            }
            return result
        }, [])
    }

    protected renderState(): void {
        throw new Error('Not implemented.')
    }
}

isWorker() && Comlink.expose(new Simple())
