
module.exports = class MyCustomReporter {
  async onRunComplete() {
    const viteServer = (await import('./vite-server.js')).default
    viteServer.close()
  }
}
