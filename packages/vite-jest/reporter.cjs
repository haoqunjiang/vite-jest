
module.exports = class MyCustomReporter {
  async onRunComplete() {
    const viteServer = (await import('./vite-server.js')).default
    await viteServer.close()
  }
}
