import { createServer } from 'vite'

const viteServer = await createServer({
  base: process.cwd() + '/',
  server: {
    middlewareMode: true,
  },
  // hmr: false
})

export default viteServer
