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

export default viteServer
