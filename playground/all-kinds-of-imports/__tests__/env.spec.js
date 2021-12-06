test('should correctly inject environment variables', () => {
  expect(import.meta.env.BASE_URL).toBe('/')
})
