import os from 'os'
import { createRequire } from 'module'

const require = createRequire(import.meta.url)

const isWindows = os.platform() === 'win32'
const resolveRelative = url => (new URL(url, import.meta.url)).pathname.substr(isWindows ? 1 : 0)

export default {
  moduleFileExtensions: ['js', 'jsx', 'json', 'vue', 'mjs', 'ts', 'tsx'],
  extensionsToTreatAsEsm: ['.jsx', '.vue', '.ts', '.tsx'],

  transform: {
    "^.+\\.(js|mjs|jsx|json|vue|ts|tsx)$": resolveRelative('./index.js'),
  },
  transformIgnorePatterns: [
    '!/node_modules/\\.vite/',
  ],

  moduleNameMapper: {
    '.+\\.(css|styl|less|sass|scss|jpg|jpeg|png|svg|gif|eot|otf|webp|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga|avif)$':
    require.resolve('jest-transform-stub'),
  },

  reporters: [
    'default',
    resolveRelative('./reporter.cjs')
  ],
}
