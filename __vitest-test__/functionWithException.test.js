//* // functionWithExpection
import { test, expect } from 'vitest'
import functionWithExpection from '../src/chapter_Advanced_Testing_JS/index.js'

test('works with normal number', () => {
  expect(functionWithExpection(2)).toBe(5)
})

test('boom (bad)', () => {
  try {
    functionWithExpection(0)
  } catch (e) {
    expect(e).not.toBeNull()
  }
})

test('bomm (good)', () => {
  expect(() => {
    functionWithExpection(0)
  }).toThrow()
})

test('boom with message', () => {
  expect(() => {
    functionWithExpection(0)
  }).toThrow('divide by zero')
})
// */
