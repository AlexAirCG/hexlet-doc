import path from 'path'
import { fileURLToPath } from 'url'
import readUserNames from './readUserNames.js'
import { test, expect } from 'vitest'

const __filepath = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filepath)

const getFixturePath = (filename) =>
  path.resolve(__dirname, '../../__fixtures__', filename)

test('readUserNames', () => {
  const pathToFixture = getFixturePath('passwd')
  const result = readUserNames(pathToFixture)
  expect(result).toEqual(['ivan', 'elena', 'admin'])
})
