import sayPrimeOrNot from '../../src/chapter_Function_JS/trial-1.js'
import { jest } from '@jest/globals'

beforeEach(() => {
  jest.spyOn(console, 'log').mockImplementation(() => {})
})

afterEach(() => {
  jest.restoreAllMocks()
})

describe('should be prime', () => {
  const numbers = [2, 3, 19, 23, 47, 5, 7, 13]

  test.each(numbers)('check with %i', (num) => {
    sayPrimeOrNot(num)
    expect(console.log).toHaveBeenLastCalledWith('yes')
  })
})

describe('should not be prime', () => {
  const numbers = [49, 8, 4, 1, 0, -3, 9, 25]

  test.each(numbers)('check with number %i', (num) => {
    sayPrimeOrNot(num)
    expect(console.log).toHaveBeenLastCalledWith('no')
  })
})
