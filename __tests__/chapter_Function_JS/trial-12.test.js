import merge from '../../src/chapter_Function_JS/trial-12.js'

describe('dictionary merge', () => {
  test('#1', () => {
    const actual = merge({ a: 1, b: 2 }, { a: 3 })
    const expected = { a: [1, 3], b: [2] }
    expect(actual).toEqual(expected)
  })

  test('#2', () => {
    const actual = merge({ a: 1, b: 2 }, { a: 3, c: 0 })
    const expected = { a: [1, 3], b: [2], c: [0] }
    expect(actual).toEqual(expected)
  })

  test('#3', () => {
    const actual = merge(
      { a: 1, b: 2, c: 3 },
      { a: 3, b: 4 },
      { a: 7, c: 1, d: 8 },
    )
    const expected = {
      a: [1, 3, 7],
      b: [2, 4],
      c: [3, 1],
      d: [8],
    }
    expect(actual).toEqual(expected)
  })

  test('#4', () => {
    const actual = merge(
      { a: 1, b: 2, c: 3 },
      { a: 3, b: 4 },
      { a: 3, b: 2, d: 5 },
    )
    const expected = {
      a: [1, 3],
      b: [2, 4],
      c: [3],
      d: [5],
    }
    expect(actual).toEqual(expected)
  })

  test('#5', () => {
    const actual = merge(
      { a: 1, b: 2, c: 3 },
      {},
      { a: 3, b: 2, d: 5 },
      { a: 6 },
      { b: 4, c: 3, d: 2 },
      { e: 9 },
    )
    const expected = {
      a: [1, 3, 6],
      b: [2, 4],
      c: [3],
      d: [5, 2],
      e: [9],
    }
    expect(actual).toEqual(expected)
  })

  test('#6', () => {
    const actual = merge({}, {}, {}, {})
    const expected = {}
    expect(actual).toEqual(expected)
  })
})
