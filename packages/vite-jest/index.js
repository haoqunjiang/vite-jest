import { createServer } from "vite";
import fs from 'fs'

let viteServer

async function getViteServer() {
  if (!viteServer) {
    viteServer = await createServer({
      base: process.cwd() + '/',
      server: {
        middlewareMode: true,
      },
      hmr: false
    })
  }

  return viteServer
}

async function processAsync(src, filepath) {
  const viteServer = await getViteServer()
  const result = await viteServer.transformRequest(filepath)

  if (!result) {
    throw new Error(`Failed to load module ${filepath}`)
  }

  return {
    code: result.code,
    map: result.map
  }
}

export default { processAsync }
