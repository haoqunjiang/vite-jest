import { msg } from '@/test.js'

test('should support alias config in vite.config.js', () => {
  expect(msg).toBe('success')
})
