const resolveRelative = url => (new URL(url, import.meta.url)).pathname

export default {
  moduleFileExtensions: ['js', 'jsx', 'json', 'vue', 'mjs'],
  extensionsToTreatAsEsm: ['.jsx', '.vue'],

  // Temporary workaround until jest supports async resolver <https://github.com/facebook/jest/issues/9505>
  // Then we can use vite to resolve such URLs
  moduleNameMapper: {
    "@vite/(.*)": "<rootDir>/node_modules/vite/dist/client/$1",
  },

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
