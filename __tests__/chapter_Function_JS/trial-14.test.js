import { jest, test, expect } from '@jest/globals'
import fakerator from 'fakerator'
import displayHistogram from '../../src/chapter_Function_JS/trial-14.js'

const getRandomFn = (seed) => {
  fakerator().seed(seed)
  return () => fakerator().random.number(1, 6)
}

test.each([32, 100, 125, 210, 9, 10, 13])(
  'histogram with rounds count %s',
  (roundsCount) => {
    console.log = jest.fn()
    const rollDie = getRandomFn(roundsCount)
    displayHistogram(roundsCount, rollDie)
    const actual = console.log.mock.calls.join('\n')
    expect(actual).toMatchSnapshot()
  },
)
