import viteServer from './vite-server.js'

async function processAsync(src, filepath) {
  const result = await viteServer.transformRequest(filepath)

  if (!result) {
    throw new Error(`Failed to load module ${filepath}`)
  }
  // Temporary fix to resolve @fs urls, which is likely to encounter in monorepos
  // TODO: in non-pnpm projects, we need to fix urls like `/src/main.js` too.
  // TODO: use es-module-lexer here
  const code = result.code.replace(
    /import .*['"].*\/@fs\/(.*)['"]/g,
    `import '/$1'`
  )

  return {
    code,
    map: result.map
  }
}


export default {
  processAsync,

  // It is necessary because we use vite-jest to tranform everything,
  // we'll inevitably encounter some CommonJS modules.
  process: src => src
}
