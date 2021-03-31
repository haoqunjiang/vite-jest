# vite-jest

A Jest transformer that enables first-class Vite integration

Currently not runnable due to 2 blocker issues:

1. Can't resolve the module via Vite server because Jest requires the resolver to be synchronous.
2. ~~Can't close the Vite server after all the transformations are done, as there's no API to tell a transformer to do so.~~ Fixed by providing a custom reporter.
