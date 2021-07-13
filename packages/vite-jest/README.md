# vite-jest

This package comes with a Jest transformer, a Jest reporter, a Jest preset, and a simple CLI wrapper of the `jest` command.

Usage:

1. Add `preset: 'vite-jest'` to your Jest config.
2. Replace the `jest` CLI with `vite-jest`.

## The Transformer

The transformer pass custom file formats such as `.vue`, `.jsx` to vite for transformation.

It also enables Vite-specific syntax extensions such as `import.meta.glob`, `import.meta.env`, etc. (still work-in-progress)

Jest doesn't support asynchronous resolver yet (<https://github.com/facebook/jest/issues/9505>).
Therefore, module paths can't be resolved via the Vite server, making a few Vite-specific paths (such as `/@vite/client` and `/@vite/env`, injected by Vite core plugins) unresolvable.

So we have to workaround this issue in the transformer, with the help of [`es-module-lexer`](https://www.npmjs.com/package/es-module-lexer)

Note that virtual files injected by Vite / Rollup plugins are not supported at the moment. You need to disable these plugins during testing (when `process.env.NODE_ENV === 'test'`).

## The Reporter

Only a Jest reporter can get the signal that all tests are done, so a custom reporter (`'vite-jest/reporter.cjs'`) is also required to correctly shutdown the Vite server after testing.

## The Preset

It helps simplify the configuration process by including most essential options.

Besides from configuring the transformer and reporter:

* `.jsx` and `.vue` must be treated as ES module to be processed by an async transformer (that is, the `vite-jest` transformer).
* The Vite cache directory (`node_modules/.vite`) must also be processed by the transformer.
* Assets and style files are stubbed.

## The `vite-jest` Command

* Jest requries the `--experimental-vm-modules` flag of Node.js to be turned on to support ES module transformation. The `vite-jest` command turns it on by default.

## TODOs

* Support `import()` edge cases
* Test `import.meta.glob`, etc.
* Better source map
* Clean up the console output
