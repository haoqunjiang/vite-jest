import fs from 'fs'
import path from 'path'
import { createServer } from 'vite'

const viteServer = await createServer({
  base: '/',
  server: {
    middlewareMode: true,
  },
  // hmr: false
})

console.log(viteServer.config.cacheDir)
// FIXME: use detected rootDir instead of process.cwd()
const viteCacheDirectory = path.join(process.cwd(), './node_modules/.vite/')
if (!fs.existsSync(viteCacheDirectory)) {
  fs.mkdirSync(viteCacheDirectory)
}
fs.writeFileSync(path.join(viteCacheDirectory, 'package.json'), JSON.stringify({ type: "module" }))


export default viteServer
