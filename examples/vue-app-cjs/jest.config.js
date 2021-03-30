module.exports = {
  moduleFileExtensions: ['js', 'jsx', 'json', 'vue', 'mjs', 'cjs'],
  transform: {
    "^.+\\.(c|m)?(js|jsx|json|vue)$": "vite-jest",
  },
  transformIgnorePatterns: ['/node_modules/'],

  // Note:
  // Test spec files must ends with `.mjs` if the project type is CommonJS.
  // (That is, no `"type": "module"` field in `package.json`)
  // It's because `vite-jest` is an asynchronous transformer,
  // and Jest only loads this kind of transformers for ES modules.
  testMatch: [
    '**/tests/unit/**/*.spec.mjs',
    '**/__tests__/*.mjs'
  ],
}
