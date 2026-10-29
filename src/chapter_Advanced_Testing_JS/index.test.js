import { vi, test, expect } from 'vitest'

test('forEach', () => {
  const callback = vi.fn()

  const number = [1, 2, 3]
  number.forEach(callback)

  expect(callback.mock.calls).toHaveLength(3)
  expect(callback.mock.calls[0][0]).toBe(1)
})
