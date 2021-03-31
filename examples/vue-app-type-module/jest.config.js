export default {
  moduleFileExtensions: ['js', 'jsx', 'json', 'vue', 'mjs'],
  extensionsToTreatAsEsm: ['.vue'],
  transform: {
    "^.+\\.(m)?(js|jsx|json|vue)$": 'vite-jest',
  },
  transformIgnorePatterns: ['/node_modules/'],
  testMatch: [
    '**/tests/unit/**/*.spec.?(m)js?(x)',
    '**/__tests__/*.?(m)js?(x)'
  ],
  testEnvironment: 'jest-environment-jsdom'
}
