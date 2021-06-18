import fs from 'fs'
import path from 'path'
import { createServer } from 'vite'

const viteServer = await createServer({
  base: '/',
  server: {
    middlewareMode: true,
  },
  optimizeDeps: {
    // esm-bundler.js is inferred as CommonJS by Jest
    // so we have to optimize it so that we require it from the `.vite/` directory
    include: ['@vue/test-utils']
  }
  // hmr: false
})

// FIXME: use detected rootDir instead of process.cwd()
const viteCacheDirectory = path.join(process.cwd(), './node_modules/.vite/')
if (!fs.existsSync(viteCacheDirectory)) {
  fs.mkdirSync(viteCacheDirectory)
}
fs.writeFileSync(path.join(viteCacheDirectory, 'package.json'), JSON.stringify({ type: "module" }))


export default viteServer
