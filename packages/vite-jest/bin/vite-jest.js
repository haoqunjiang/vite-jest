#!/usr/bin/env node

import execa from 'execa'
import { createRequire } from 'module'

const require = createRequire(import.meta.url)
const jestPath = require.resolve('jest/bin/jest')

const additionalArgs = process.argv.slice(2)
if (!additionalArgs.includes('--runInBand') && !additionalArgs.includes('-i')) {
  additionalArgs.push('--runInBand')
}

if(!additionalArgs.includes('--no-cache')) {
  additionalArgs.push('--no-cache')
}

execa.sync('node', [
  '--experimental-vm-modules',
  jestPath,
  ...additionalArgs
], {
  stdio: 'inherit'
})
