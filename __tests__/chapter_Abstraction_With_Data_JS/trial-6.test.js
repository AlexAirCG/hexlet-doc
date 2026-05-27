import {
  makeRational,
  getDenom,
  getNumer,
  add,
  sub,
  ratToString,
} from '../../src/chapter_Abstraction_With_Data_JS/trial-6.js'

test('makeRational, getNumer, getDenom', () => {
  const rat1 = makeRational(3, 9)
  const rat3 = makeRational(4, -16)
  expect(getNumer(rat1)).toBe(1)
  expect(getDenom(rat1)).toBe(3)
  expect(getNumer(rat3)).toBe(-1)
  expect(getDenom(rat3)).toBe(4)
})

test('add', () => {
  const rat1 = makeRational(3, 9)
  const rat2 = makeRational(10, 3)
  const rat3 = makeRational(-4, 16)
  const rat4 = makeRational(12, 5)
  expect(add(rat1, rat2)).toEqual(makeRational(11, 3))
  expect(add(rat3, rat4)).toEqual(makeRational(43, 20))
})

test('sub', () => {
  const rat1 = makeRational(3, 9)
  const rat2 = makeRational(10, 3)
  const rat3 = makeRational(-4, 16)
  const rat4 = makeRational(12, 5)
  expect(sub(rat1, rat2)).toEqual(makeRational(-3, 1))
  expect(sub(rat3, rat4)).toEqual(makeRational(-53, 20))
})

test('ratToString', () => {
  const rat1 = makeRational(3, 9)
  const rat3 = makeRational(-4, 16)
  expect(ratToString(rat1)).toBe('1/3')
  expect(ratToString(rat3)).toBe('-1/4')
})
