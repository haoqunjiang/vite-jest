import os from 'os'
import path from 'path'
import { createRequire } from 'module';

import { parse } from 'es-module-lexer/dist/lexer.js'
import MagicString from 'magic-string'

import viteServer from './vite-server.js'

const require = createRequire(import.meta.url)

const isWindows = os.platform() === 'win32'
const VOLUME_RE = /^[A-Z]:/i
const FS_PREFIX = `/@fs/`

export function normalizePath(id) {
  return path.posix.normalize(isWindows ? slash(id) : id)
}

export function fsPathFromId(id) {
  const fsPath = normalizePath(id.slice(FS_PREFIX.length))
  return fsPath.startsWith('/') || fsPath.match(VOLUME_RE)
    ? fsPath
    : `/${fsPath}`
}

// TODO: use a createTransformer function to get rootDir
const rootDir = process.cwd()

async function processAsync(src, filepath) {
  const result = await viteServer.transformRequest(filepath)

  if (!result) {
    throw new Error(`Failed to load module ${filepath}`)
  }

  // The following logic is better to be placed in an async jest resolver
  const mStr = new MagicString(result.code)
  const [imports] = await parse(result.code)
  for (let index = 0; index < imports.length; index++) {
    const {
      s: start,
      e: end,
      ss: expStart,
      d: dynamicIndex,
      n: url
    } = imports[index]

    if (dynamicIndex > -1) {
      // TODO
      console.log('dynamic import not supported yet')
    } else if (url) {
      if (url.startsWith(FS_PREFIX)) {
        mStr.overwrite(start, end, fsPathFromId(url))
      } else if (url.startsWith('/')) {
        mStr.overwrite(start, end, path.join(rootDir, url))
      } else if (url === '/@vite/env') {
        mStr.overwrite(start, end, require.resolve('vite/dist/client/env.js'))
      } else if (url === '/@vite/client') {
        mStr.overwrite(start, end, require.resolve('vite/dist/client/client.js'))
      }
    }
  }

  return {
    code: mStr.toString(),
    // TODO: use `@cush/sorcery` to merge source map of the magic string
    map: result.map
  }
}

function processSync (src, filepath) {
  // TODO:
  // Implement https://github.com/vitejs/vite/blob/main/packages/vite/src/node/plugins/clientInjections.ts
  return src
}


export default {
  processAsync,

  // It is necessary because we use vite-jest to tranform everything,
  // we'll inevitably encounter some CommonJS modules.
  process: processSync
}
