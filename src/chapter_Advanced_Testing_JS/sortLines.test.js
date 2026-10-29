import { test, expect, beforeEach } from 'vitest'
import path from 'path'
import os from 'os'
import fs from 'fs/promises'
import { fileURLToPath } from 'url'
import sortLines from './sortLines.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const getFixturePath = (filename) =>
  path.resolve(__dirname, '../../__fixtures__', filename)

const destPath = path.join(os.tmpdir(), 'lines.txt')

beforeEach(async () => {
  await fs.copyFile(getFixturePath('unsorted.txt'), destPath)
})

test('sortedLines', async () => {
  await sortLines(destPath)
  const actual = await fs.readFile(destPath, 'utf-8')
  const expected = await fs.readFile(getFixturePath('sorted.txt'), 'utf-8')
  expect(actual).toBe(expected)
})
