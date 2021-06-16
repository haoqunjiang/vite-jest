const resolveRelative = url => (new URL(url, import.meta.url)).pathname

export default {
  moduleFileExtensions: ['js', 'jsx', 'json', 'vue', 'mjs'],
  extensionsToTreatAsEsm: ['.jsx', '.vue'],

  transform: {
    "^.+\\.(m)?(js|jsx|json|vue)$": resolveRelative('./index.js'),
  },
  transformIgnorePatterns: [
    '!/node_modules/\\.vite/',
  ],

  reporters: [
    'default',
    resolveRelative('./reporter.cjs')
  ],
}
