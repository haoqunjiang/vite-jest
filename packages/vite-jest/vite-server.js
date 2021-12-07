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
  },

  // `@jest/globals` must be kept-as-is
  // https://github.com/facebook/jest/blob/3093c18c428d962eb959437b322c6a5b0ae0e7a2/packages/jest-runtime/src/index.ts#L544-L554
  optimizeDeps: {
    exclude: ['@jest/globals']
  },
  plugins: [
    {
      resolveId(id) {
        if (id === '@jest/globals') {
          return id
        }
      },
      enforce: 'pre'
    }
  ]
})

// A cache directory for virtual modules
const viteJestCacheDirctory = path.resolve(viteServer.config.cacheDir, '../.vite-jest-cache')
if (!fs.existsSync(viteJestCacheDirctory)) {
  fs.mkdirSync(viteJestCacheDirctory)
}
fs.writeFileSync(path.join(viteJestCacheDirctory, 'package.json'), JSON.stringify({ type: "module" }))


export default viteServer
export { viteJestCacheDirctory }
