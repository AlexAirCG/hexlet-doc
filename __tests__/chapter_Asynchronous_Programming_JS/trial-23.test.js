import path from 'path'
import fs from 'fs'
import os from 'os'
import promisify from '../../src/chapter_Asynchronous_Programming_JS/trial-23.js'
import { test, expect } from 'vitest'

const readFile = promisify(fs.readFile)
const writeFile = promisify(fs.writeFile)
const access = promisify(fs.access)
const mkdtemp = promisify(fs.mkdtemp)

test('promisify', async () => {
  const directory = await mkdtemp(path.join(os.tmpdir(), 'foo-'))
  const filepath = path.join(directory, 'file')
  await expect(
    readFile(filepath),
    'Если колбек получил ошибку, промис отклоняется',
  ).rejects.toThrow()
  await expect(writeFile(filepath, 'content')).resolves.not.toThrow()
  await expect(access(filepath)).resolves.not.toThrow()
  await expect(
    readFile(filepath, 'utf-8'),
    'Промис завершается данными, которые исходная функция передала в колбек',
  ).resolves.toEqual('content')
})

test('promise reject', async () => {
  const filepath = 'undefined'
  await expect(
    readFile(filepath),
    'Если колбек получил ошибку, промис отклоняется',
  ).rejects.toThrow()
})
