import convert from '../../src/chapter_Function_JS/trial-3.js'

it('test without parameters', () => {
  const formattedDates = []
  expect(convert()).toEqual(formattedDates)
})

it('test #1', () => {
  const item = [1993, 4, 24]
  const formattedDates = ['Sat Apr 24 1993']
  expect(convert(item)).toEqual(formattedDates)
})

it('test #2', () => {
  const coll = [
    [1993, 4, 24],
    [1997, 9, 12],
    [2001, 11, 18],
  ]
  const formattedDates = [
    'Sat Apr 24 1993',
    'Fri Sep 12 1997',
    'Sun Nov 18 2001',
  ]
  expect(convert(...coll)).toEqual(formattedDates)
})

it('test #3', () => {
  const coll = [
    [1982, 12, 11],
    [1996, 6, 28],
    [2005, 2, 1],
    [2000, 12, 12],
    [1994, 8, 31],
  ]
  const formattedDates = [
    'Sat Dec 11 1982',
    'Fri Jun 28 1996',
    'Tue Feb 01 2005',
    'Tue Dec 12 2000',
    'Wed Aug 31 1994',
  ]
  expect(convert(...coll)).toEqual(formattedDates)
})
