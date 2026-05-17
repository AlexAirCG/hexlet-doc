import takeLast from '../../src/chapter_Function_JS/num-4.js'

test('should return reverse n symbol', () => {
  expect(takeLast('hello', 2)).toBe('ol')
})

test('should return null', () => {
  expect(takeLast('')).toBe(null)
})

test('mast be str >= n', () => {
  expect(takeLast('hello', 6)).toBe(null)
})

console.log(takeLast('')) // null
console.log(takeLast('cb')) // null
console.log(takeLast('power', 3)) // rewo
console.log(takeLast('hexlet')) // telx
