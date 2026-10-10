import os from 'os'
import fsp from 'fs/promises'
import { exchange } from '../../src/chapter_Asynchronous_Programming_JS/trial-12.js'

test('exchange 1', async () => {
  const firstPath = `${os.tmpdir()}/first`
  const secondPath = `${os.tmpdir()}/second`
  const firstContent = 'content1'
  const secondContent = 'content2'
  await fsp.writeFile(firstPath, firstContent)
  await fsp.writeFile(secondPath, secondContent)
  await exchange(firstPath, secondPath)

  const result1 = await fsp.readFile(firstPath, 'utf-8')
  expect(result1).toBe(secondContent)
  const result2 = await fsp.readFile(secondPath, 'utf-8')
  expect(result2).toBe(firstContent)
})
