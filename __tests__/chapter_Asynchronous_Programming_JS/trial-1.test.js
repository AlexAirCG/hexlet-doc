import fs from 'fs'
import { jest } from '@jest/globals'
import print from '../../src/chapter_Asynchronous_Programming_JS/trial-1.js'

test('readFile', () => {
  const results = []
  const { log } = console
  console.log = jest.fn((...args) => {
    results.push(...args)
    log(...args)
  })
  print('__tests__/chapter_Asynchronous_Programming_JS/trial-1.test.js')

  // чтение должно быть асинхронным: к этому моменту вывода ещё нет
  expect(results).toEqual([])

  return new Promise((done) => {
    setTimeout(() => {
      const expected = [
        fs.readFileSync(
          '__tests__/chapter_Asynchronous_Programming_JS/trial-1.test.js',
          'utf-8',
        ),
      ]
      expect(results).toEqual(expected)
      done()
    }, 2000)
  })
})
