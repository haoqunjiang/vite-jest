import fs from 'fs'
import path from 'path'
import { createServer } from 'vite'

const viteServer = await createServer({
  base: '/',
  server: {
    hmr: false,
    middlewareMode: true,
  },
  resolve: {
    alias: {
      // For similar reasons as in https://github.com/cypress-io/cypress/blob/570f91dde3a8bd54fd059e1cfe0f85bab8f1a7cb/npm/vite-dev-server/src/startServer.ts#L35-L37
      vue: 'vue/dist/vue.esm-bundler.js',
      '@vue/compiler-core': '@vue/compiler-core/dist/compiler-core.cjs.js',
      '@vue/test-utils': '@vue/test-utils/dist/vue-test-utils.cjs.js',
    }
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
