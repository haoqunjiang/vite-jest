import { modules } from '../dir/index.js'

test('should work with glob imports', () => {
  expect(modules).toMatchObject({
    './foo.js': {
      msg: 'foo'
    }
  })
})
