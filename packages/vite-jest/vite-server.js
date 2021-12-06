import fs from 'fs'
import path from 'path'
import { createServer } from 'vite'

const viteServer = await createServer({
  base: '/',
  server: {
    hmr: false,
    middlewareMode: true,
  }
})

// A cache directory for virtual modules
const viteJestCacheDirctory = path.resolve(viteServer.config.cacheDir, '../.vite-jest-cache')
if (!fs.existsSync(viteJestCacheDirctory)) {
  fs.mkdirSync(viteJestCacheDirctory)
}
fs.writeFileSync(path.join(viteJestCacheDirctory, 'package.json'), JSON.stringify({ type: "module" }))


export default viteServer
export { viteJestCacheDirctory }
