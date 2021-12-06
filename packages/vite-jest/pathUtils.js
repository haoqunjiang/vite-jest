import os from 'os'
import path from 'path'

import slash from 'slash'

import { viteJestCacheDirctory } from './vite-server.js'

export function isVirtualFileRequest(requestUrl) {
  // Rollup plugin internals
  if (requestUrl.startsWith('\0')) {
    return true
  }

  // Vite plugin conventions
  if (requestUrl.startsWith('virtual:')) {
    return true
  }

  // Vite internal
  // https://github.com/vitejs/vite/blob/49f28e23cae0ad588fc89374918d3a5e942c5075/packages/vite/src/node/plugins/importAnalysis.ts#L233-L239
  if (requestUrl.startsWith('/@id/')) {
    return true
  }

  // Vite internals
  if (requestUrl === '/@vite/client' || requestUrl === '/@vite/env') {
    return true
  }

  // @vitejs/plugin-vue
  if (requestUrl.includes(':')) {
    return true
  }

  if (requestUrl.startsWith('/@react-refresh')) {
    return true
  }

  // SvelteKit
  if (requestUrl.startsWith('$app/')) {
    return true
  }

  return false
}

export function virtualPathToFsPath(virtualPath) {
  return path.resolve(
    viteJestCacheDirctory,
    virtualPath.replace('\0', '__x00__')
      .replace(/\//g, '__slash__')
      .replace(/\$/g, '__dollar__')
      .replace(/\:/g, '__colon__')
      + '.js'
  )
}


const isWindows = os.platform() === 'win32'
const VOLUME_RE = /^[A-Z]:/i

export const FS_PREFIX = `/@fs/`

export const slashOnWindows = path => isWindows ? slash(path) : path

function normalizePath(id) {
  return path.posix.normalize(slashOnWindows(id))
}

export function fsPathFromId(id) {
  const fsPath = normalizePath(id.slice(FS_PREFIX.length))
  return fsPath.startsWith('/') || fsPath.match(VOLUME_RE)
    ? fsPath
    : `/${fsPath}`
}
