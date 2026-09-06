import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

import getForwardedVariables from '../../src/chapter_Function_JS/trial-20.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const getFixturePath = (filename) =>
  path.join(__dirname, '..', '..', '__fixtures__', filename)
const readFixture = (filename) =>
  fs.readFileSync(getFixturePath(filename), 'utf-8').trim()

const data = [
  ['s1.conf', 'variable=value'],
  [
    's2.conf',
    'var1=111,var2=123,var3=value,mail=tirion@google.com,HOME=/home/tirion',
  ],
]

describe('getForwardedVariables', () => {
  test.each(data)('with %s', (filename, expected) => {
    const config = readFixture(filename)
    expect(getForwardedVariables(config)).toEqual(expected)
  })
})
