#!/usr/bin/env node

import fs from 'fs'
import path from 'path'
import execa from 'execa'
import { createRequire } from 'module'

const require = createRequire(import.meta.url)
const jestPath = require.resolve('jest/bin/jest')

const viteClientDirectory = path.join(process.cwd(), './node_modules/vite/dist/client')
fs.writeFileSync(path.join(viteClientDirectory, 'package.json'), JSON.stringify({ type: "module" }))

execa.sync('node', [
  '--experimental-vm-modules',
  jestPath,
  ...process.argv.slice(2)
], {
  stdio: 'inherit'
})
