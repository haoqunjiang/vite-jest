export default {
  moduleFileExtensions: ['js', 'jsx', 'json', 'vue', 'mjs'],
  extensionsToTreatAsEsm: ['.jsx', '.vue'],
  transform: {
    "^.+\\.(m)?(js|jsx|json|vue)$": 'vite-jest',
  },
  transformIgnorePatterns: [
    '!/node_modules/\\.vite/',
  ],
  testMatch: [
    '**/tests/unit/**/*.spec.?(m)js?(x)',
    '**/__tests__/*.?(m)js?(x)'
  ],
  testEnvironment: 'jest-environment-jsdom',
  moduleNameMapper: {
    "@vite/(.*)": "<rootDir>/node_modules/vite/dist/client/$1",
  },
  reporters: [
    'default',
    'vite-jest/reporter.cjs'
  ]
}
