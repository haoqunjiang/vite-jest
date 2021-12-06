test('should work with dynamic imports', async () => {
  const dynamicImport = await import('./../dir/foo.js');
  expect(dynamicImport.msg).toBe('foo');
})
