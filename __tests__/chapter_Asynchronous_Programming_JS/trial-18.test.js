import fs from 'fs'
import os from 'os'
import path from 'path'
import { fileURLToPath } from 'url'
import ls from '../../src/chapter_Asynchronous_Programming_JS/trial-18.js'

let dirpath

beforeAll(() => {
  dirpath = fs.mkdtempSync(path.join(os.tmpdir(), 'hexlet-ls-'))
  fs.mkdirSync(path.join(dirpath, 'nested'))
  fs.writeFileSync(path.join(dirpath, 'alpha'), 'a')
  fs.writeFileSync(path.join(dirpath, 'omega'), 'o')
})

test('ls dir', async () => {
  const expected = ['omega', 'nested', 'alpha']
    .map((name) => path.join(dirpath, name))
    .map((filepath) => ({ filepath, mode: fs.statSync(filepath).mode }))

  const actual = await ls(dirpath)
  expect(actual).toEqual(expected)
})

test('ls file', async () => {
  const filepath = path.join(dirpath, 'alpha')
  const expected = [{ filepath, mode: fs.statSync(filepath).mode }]
  const actual = await ls(filepath)
  expect(actual).toEqual(expected)
})

test('ls file relative path', async () => {
  const expected = [
    { filepath: '/etc/passwd', mode: fs.statSync('/etc/passwd').mode },
  ]
  const testDirname = path.dirname(fileURLToPath(import.meta.url))
  const filepath = path.relative(testDirname, '/etc/passwd')
  const actual = await ls(filepath)
  expect(actual).toEqual(expected)
})
