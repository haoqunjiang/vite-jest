import fs from 'fs'
import { createRequire } from 'module';

const require = createRequire(import.meta.url)
const clientPath = require.resolve('vite/dist/client/client')
const envPath = require.resolve('vite/dist/client/env')

if (fs.existsSync(clientPath)) {
  fs.renameSync(clientPath, clientPath.replace(/.js$/, '.mjs'))
}

if (fs.existsSync(envPath)) {
  fs.renameSync(envPath, envPath.replace(/.js$/, '.mjs'))
}


const chunkPath = require.resolve('vite/dist/node/chunks/dep-6e02b235')
const chunkFile = fs.readFileSync(chunkPath, 'utf-8')
fs.writeFileSync(
  chunkPath,
  chunkFile
    .replace(`'vite/dist/client/client.js'`, `'vite/dist/client/client.mjs'`)
    .replace(`'vite/dist/client/env.js'`, `'vite/dist/client/env.mjs'`)
)
