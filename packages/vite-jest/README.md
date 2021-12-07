# vite-jest

This package comes with a Jest transformer, a Jest reporter, a Jest preset, and a simple CLI wrapper of the `jest` command.

Usage:

1. Add `preset: 'vite-jest'` to your Jest config.
2. Replace the `jest` CLI with `vite-jest`.

## Limitations and Differences with CommonJS tests

Most are already documented in the official Jest documentation:
<https://jestjs.io/docs/ecmascript-modules#differences-between-esm-and-commonjs>

### The `jest` Object

It's not automatically injected into each module. To access it, you must import it from `@jest/globals`: `import { jest } from '@jest/globals'`

### Mocking ES Modules

Jest currently doesn't support jest.mock in a clean way in ESM.

There's now an experimental API (`jest.unstable_mockModule`) for this, but you must use it in combination with top-level await and dynamic imports:

```js
// Note that jest must be explicitly imported
import { jest } from '@jest/globals';

const mockPlaySoundFile = jest.fn();
jest.unstable_mockModule('./sound-player', () => {
    return {default: jest.fn().mockImplementation(() => {
        return { playSoundFile: mockPlaySoundFile };
    })};
});

// Note that the mocked module must be dynamically imported
const {default: SoundPlayer} = await import('./sound-player');
const {default: SoundPlayerConsumer} = await import('./sound-player-consumer');

beforeEach(() => {
  SoundPlayer.mockClear();
  mockPlaySoundFile.mockClear();
});
```

Follow [this issue](https://github.com/facebook/jest/issues/10025) for updates.

### Doesn't Support Windows (yet)

We are actively working on that. It may be supported in a patch release.

### Coverage Report May be broken

We are not very sure how to fix this. Any help is appreciated.

---

## `vite-jest` Internals

### The Transformer

The transformer pass custom file formats such as `.vue`, `.jsx` to vite for transformation.

It also enables Vite-specific syntax extensions such as `import.meta.glob`, `import.meta.env`, etc. (still work-in-progress)

Jest doesn't support asynchronous resolver yet (<https://github.com/facebook/jest/issues/9505>).
Therefore, module paths can't be resolved via the Vite server, making a few Vite-specific paths (such as `/@vite/client` and `/@vite/env`, injected by Vite core plugins) unresolvable.

So we have to workaround this issue in the transformer, with the help of [`es-module-lexer`](https://www.npmjs.com/package/es-module-lexer)

Virtual files injected by Vite / Rollup plugins are writtern to the `./node_modules/.vite-jest-cache` directory.

Note that React fast refresh is not supported at the moment. You need to disable this feature during testing (when `process.env.NODE_ENV === 'test'`).

### The Reporter

Only a Jest reporter can get the signal that all tests are done, so a custom reporter (`'vite-jest/reporter.cjs'`) is also required to correctly shutdown the Vite server after testing.

### The Preset

It helps simplify the configuration process by including most essential options.

Besides from configuring the transformer and reporter:

* `.jsx` and `.vue` must be treated as ES module to be processed by an async transformer (that is, the `vite-jest` transformer).
* The Vite cache directory (`node_modules/.vite`) must also be processed by the transformer.
* Assets and style files are stubbed.

### The `vite-jest` Command

* Jest requries the `--experimental-vm-modules` flag of Node.js to be turned on to support ES module transformation. The `vite-jest` command turns it on by default.
* All tests must be run serially, because both Vite and `vite-jest` use caches heavily, paralleriazation may cause race conditions. So `vite-jest` automatically passes a `--runInBand` to the underlying `jest` command.
* A `--no-cache` argument is also passed to fix some edge cases. Since Vite transformation is ususally very fast, the performance penalty of not caching is negligible.

## TODOs

* Better source map
* Clean up the console output
