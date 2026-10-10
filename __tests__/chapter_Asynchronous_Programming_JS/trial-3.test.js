import fs from 'fs'
import os from 'os'
import path from 'path'
import { compareFileSizes } from '../../src/chapter_Asynchronous_Programming_JS/trial-3.js'

// Файлы для сравнения готовит сам тест: раньше он ссылался на «__tests__/test.js»,
// которого в упражнении нет, и падал на разборе результата stat, а не на решении.
let small
let big

beforeAll(() => {
  const dirpath = fs.mkdtempSync(path.join(os.tmpdir(), 'hexlet-sizes-'))
  small = path.join(dirpath, 'small')
  big = path.join(dirpath, 'big')
  fs.writeFileSync(small, 'a')
  fs.writeFileSync(big, 'a'.repeat(100))
})

test('compareFileSizes 1', () =>
  new Promise((resolve) => {
    compareFileSizes(small, small, (_error1, result) => {
      expect(result).toBe(0)
      resolve()
    })
  }))

test('compareFileSizes 2', () =>
  new Promise((resolve) => {
    compareFileSizes(big, small, (_error1, result) => {
      expect(result).toBe(1)
      resolve()
    })
  }))

test('compareFileSizes 3', () =>
  new Promise((resolve) => {
    compareFileSizes(small, big, (_error1, result) => {
      expect(result).toBe(-1)
      resolve()
    })
  }))
