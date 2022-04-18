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

import * as monaco from 'monaco-editor'
import * as React from 'react'
import { render } from 'react-dom'
import 'react-sigma-v2/lib/react-sigma-v2.css'
import uikit from 'uikit'
import 'uikit/dist/css/uikit.min.css'
import Icons from 'uikit/dist/js/uikit-icons'
import { App } from './app'
import { Games } from './setup'
import './patch.css'

uikit.use(Icons)

self.MonacoEnvironment = {
  getWorker: () => new Worker(new URL('./../node_modules/monaco-editor/esm/vs/language/json/json.worker.js', import.meta.url), { type: 'module' })
}

monaco.languages.json.jsonDefaults.setDiagnosticsOptions({
  validate: true,
  schemas: Object.entries(Games).map(([id, data]) => ({
    uri: `https://meitinger.github.io/GameSolver/schemas/${id}.json`,
    fileMatch: [data.fileName],
    schema: data.schema
  }))
})

render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('app')
)
