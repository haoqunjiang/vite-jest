import fs from 'fs'
import path from 'path'
import { createServer } from 'vite'

const viteServer = await createServer({
  base: '/',
  resolve: {
    // `module`, `jsnext:main`, and `jsnext` are not standard Node.js package.json fields.
    // Entries listed in these fields are not likely recognizable as Node.js ESM.
    // So we must skip them. Use `exports` or `main` only.
    mainFields: []
  },
  server: {
    middlewareMode: true,
  },
  // hmr: false
})

// Workaround to make Node recognize these files as ES modules
// FIXME: currently it doesn't work on the first run
const viteCacheDirectory = viteServer.config.cacheDir
if (!fs.existsSync(viteCacheDirectory)) {
  fs.mkdirSync(viteCacheDirectory)
}
fs.writeFileSync(path.join(viteCacheDirectory, 'package.json'), JSON.stringify({ type: "module" }))


export default viteServer
