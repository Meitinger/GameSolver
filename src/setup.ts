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

import { GameMetaData, TypedGameMetaData } from './game'
import { Simple, Schema as SimpleSchema, Setup as SimpleSetup } from './simple'
import { TicTacToe, Schema as TicTacToeSchema, Setup as TicTacToeSetup } from './tictactoe'

const tictactoe: TypedGameMetaData<TicTacToeSetup> = {
  label: 'Tic Tac Toe',
  hasArena: true,
  instance: new TicTacToe(),
  createWorker: () => new Worker(new URL('./tictactoe.ts', import.meta.url), { type: 'module' }),
  fileName: 'gamesolver:tictactoe',
  schema: TicTacToeSchema,
  setup: {
    board: [
      [' ', 'x', ' '],
      [' ', 'o', ' '],
      [' ', 'x', ' ']
    ],
    start: 'o'
  }
}

const simple: TypedGameMetaData<SimpleSetup> = {
  label: 'User Defined',
  hasArena: false,
  instance: new Simple(),
  createWorker: () => new Worker(new URL('./simple.ts', import.meta.url), { type: 'module' }),
  fileName: 'gamesolver:simple',
  schema: SimpleSchema,
  setup: {
    players: {
      G: {
        color: 'rgba(0,255,0,128)',
        moves: {
          2: ['1', '3'],
          4: ['3', '5'],
          6: ['1']
        },
        wins: ['5', '6']
      },
      R: {
        color: 'rgba(255,0,0,128)',
        moves: {
          1: ['2', '6'],
          3: ['4', '5'],
          5: []
        },
        wins: []
      }
    },
    start: '1'
  }
}

export const Games: {
  [name: string]: GameMetaData
} = {
  tictactoe,
  simple
}
