import convert from '../../src/trials/convert.js'

test('should return empty array', () => {
  expect(convert()).toEqual([])
})

test('should return string from array the date', () => {
  expect(convert([1993, 4, 24])).toEqual(['Sat Apr 24 1993'])
})

test('should return array of strings', () => {
  expect(convert([1993, 4, 24], [1997, 9, 12], [2001, 11, 18])).toEqual([
    'Sat Apr 24 1993',
    'Fri Sep 12 1997',
    'Sun Nov 18 2001',
  ])
})
