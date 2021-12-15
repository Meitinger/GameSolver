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
import { Dispatch, Reducer, SetStateAction, useReducer } from 'react'
import uikit from 'uikit'

const ajv = new Ajv()

export async function prompt (message: string): Promise<string | null> {
  try {
    return await uikit.modal.prompt(message, '')
  } catch {
    return window.prompt(message)
  }
}

export async function confirm (message: string): Promise<boolean> {
  try {
    await uikit.modal.confirm(message)
    return true
  } catch (error) {
    return error == null ? window.confirm(message) : false
  }
}

export async function alert (message: string): Promise<void> {
  try {
    await uikit.modal.alert(message)
  } catch {
    window.alert(message)
  }
}

export type JsonSerializable =
    | null
    | boolean
    | number
    | string
    | JsonSerializable[]
    | { [key: string]: JsonSerializable }

export type JsonSerializableType<T> = {
  [P in keyof T]: T[P] & (JsonSerializable | JsonSerializableType<T[P]>)
}

export function usePersistedState<S = JsonSerializable> (name: string, initialState: S, schema: JSONSchemaType<S>): [S, Dispatch<SetStateAction<S>>] {
  return useReducer<Reducer<S, SetStateAction<S>>, S>(
    (prevState: S, setState: SetStateAction<S>) => {
      const state = setState instanceof Function ? setState(prevState) : setState
      window.localStorage.setItem(name, JSON.stringify(state))
      return state
    },
    initialState,
    (initialState: S) => {
      const persistedtate = window.localStorage.getItem(name)
      if (persistedtate != null) {
        try {
          const data: unknown = JSON.parse(persistedtate)
          if (ajv.validate(schema, data)) {
            return data
          }
        } catch (reason) { console.error(reason) }
      }
      return initialState
    }
  )
}
