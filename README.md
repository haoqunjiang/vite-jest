# vite-jest

A Jest transformer that enables first-class Vite integration.

Currently only the [`vue-app-type-module`](./examples/vue-app-type-module/) example works, and requires several hacks.

The major blocking issue is that Jest doesn't support asynchronous resolver yet.
Therefore, module paths can't be resolved via the Vite server, making a few Vite-specific paths (injected by Vite core plugins) unresolvable.
To work around this issue in the example app, we used `moduleNameMapper` to fix injected paths like `/@vite/client` and `/@vite/env`, and a simple regular expression replacement in the transformer implementation to support `@fs` URLs.

To correctly shutdown the Vite server after all tests are done, a custom reporter (`'vite-jest/reporter.cjs'`) is also required in the Jest config.
