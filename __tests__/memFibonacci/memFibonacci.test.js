import { expect, jest } from '@jest/globals'
import utils from '../../src/memFibonacci/utils.js'

import getImpelementation from '../../src/memFibonacci/index.js'

const memoFibonacci = getImpelementation()

test('Positive cases', () => {
  expect(utils.fibonacci(0)).toBe(0)
  expect(utils.fibonacci(1)).toBe(1)
  expect(utils.fibonacci(5)).toBe(5)
  expect(utils.fibonacci(10)).toBe(55)
})

test('Negative cases', () => {
  expect(() => {
    utils.fibonacci(-1)
  }).toThrow('Введите положительное целое число')
})

test('Memoization', () => {
  const spy = jest.spyOn(utils, 'fibonacci')
  expect(memoFibonacci(1)).toBe(1)
  expect(memoFibonacci(1)).toBe(1)
  expect(spy).toHaveBeenCalledTimes(1)

  expect(memoFibonacci(3)).toBe(2)
  expect(memoFibonacci(3)).toBe(2)
  expect(spy).toHaveBeenCalledTimes(6)
})
