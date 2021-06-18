const resolveRelative = url => (new URL(url, import.meta.url)).pathname

export default {
  moduleFileExtensions: ['js', 'jsx', 'json', 'vue', 'mjs', 'ts', 'tsx'],
  extensionsToTreatAsEsm: ['.jsx', '.vue', '.ts', '.tsx'],

  transform: {
    "^.+\\.(js|mjs|jsx|json|vue|ts|tsx)$": resolveRelative('./index.js'),
  },
  transformIgnorePatterns: [
    '!/node_modules/\\.vite/',
  ],

  reporters: [
    'default',
    resolveRelative('./reporter.cjs')
  ],
}
