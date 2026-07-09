import calculateProbabilities from '../../src/chapter_Function_JS/trial-16.js'

test('calculateProbabilities', () => {
  expect(calculateProbabilities([])).toEqual({})

  const expected1 = {
    1: { 3: 0.5, 5: 0.5 },
    3: { 1: 1.0 },
    5: { 1: 1.0 },
  }
  expect(calculateProbabilities([1, 3, 1, 5, 1])).toEqual(expected1)

  const expected2 = {
    1: {
      2: 0.25,
      3: 0.25,
      5: 0.25,
      6: 0.25,
    },
    2: { 1: 1 },
    3: { 1: 1 },
    5: { 1: 1 },
    6: {},
  }
  expect(calculateProbabilities([1, 3, 1, 5, 1, 2, 1, 6])).toEqual(expected2)

  const expected3 = {
    1: { 3: 1 },
    2: {
      1: 0.25,
      2: 0.25,
      3: 0.25,
      5: 0.25,
    },
    3: { 2: 1 },
    5: { 2: 1 },
  }
  expect(calculateProbabilities([2, 3, 2, 5, 2, 2, 1, 3])).toEqual(expected3)

  const expected4 = {
    1: {
      2: 0.2,
      3: 0.4,
      5: 0.2,
      6: 0.2,
    },
    2: { 1: 1 },
    3: { 1: 1 },
    5: { 1: 1 },
    6: { 1: 1 },
  }
  expect(calculateProbabilities([1, 3, 1, 5, 1, 2, 1, 6, 1, 3])).toEqual(
    expected4,
  )
})
