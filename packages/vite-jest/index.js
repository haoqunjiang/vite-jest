// import fs from 'fs'
import viteServer from './vite-server.js'

async function processAsync(src, filepath) {
  const result = await viteServer.transformRequest(filepath)

  if (!result) {
    throw new Error(`Failed to load module ${filepath}`)
  }
  // temporary fix to resolve @fs urls, which is likely to encounter in monorepos
  const code = result.code.replace(
    /import ['"].*\/@fs\/(.*)['"]/g,
    `import '/$1'`
  )

  return {
    code,
    map: result.map
  }
}


export default {
  processAsync,
  process: src => src
}
