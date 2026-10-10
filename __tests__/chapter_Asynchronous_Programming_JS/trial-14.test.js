import path from 'path'
import os from 'os'
import fs from 'fs'
import { unionFiles } from '../../src/chapter_Asynchronous_Programming_JS/trial-14.js'

let output
let filepath1
let filepath2

beforeAll(() => {
  const tmpDir = fs.mkdtempSync(`${os.tmpdir()}/`)
  output = path.join(tmpDir, 'output')
  filepath1 = path.join(tmpDir, 'source1')
  fs.writeFileSync(filepath1, 'data1')
  filepath2 = path.join(tmpDir, 'source12')
  fs.writeFileSync(filepath2, 'data2')
})

const union = (path1, path2, outputPath) =>
  new Promise((resolve) => {
    unionFiles(path1, path2, outputPath, (err) => resolve(err))
  })

test('unionFiles 1', async () => {
  const err = await union('/undefined', filepath2, output)
  // 'Если первого файла нет, итоговый колбек получает ошибку'
  expect(err).toBeTruthy()
})

test('unionFiles 2', async () => {
  const err = await union(filepath1, '/undefined', output)
  // 'Если второго файла нет, итоговый колбек получает ошибку'
  expect(err).toBeTruthy()
})

test('unionFiles 3', async () => {
  const err = await union(filepath1, filepath2, '/a/b/c/')
  // 'Если записать файл не удалось, итоговый колбек получает ошибку'
  expect(err).toBeTruthy()
})

test('unionFiles 4', async () => {
  const err = await union(filepath1, filepath2, output)
  // 'После успешной записи итоговый колбек получает null'
  expect(err).toBeNull()
  const data = fs.readFileSync(output, 'utf-8')
  // 'Выходной файл содержит данные первого и второго файлов подряд'
  expect(data).toBe('data1data2')
})
