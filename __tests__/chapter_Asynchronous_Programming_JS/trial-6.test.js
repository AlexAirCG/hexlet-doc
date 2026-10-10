import path from 'path'
import os from 'os'
import fs from 'fs'
import watch from '../../src/chapter_Asynchronous_Programming_JS/trial-6.js'

const buildFilePath = (n) => path.join(os.tmpdir(), `example-2-${n}`)

const prepareFileSync = (n) => {
  const filepath = buildFilePath(n)
  fs.writeFileSync(filepath, '')
  // mtimeMs дробное, а время старта наблюдателя целое, потому что берётся из
  // Date.now(). У только что созданного файла mtimeMs поэтому почти всегда
  // больше времени старта. Сдвигаем mtime в прошлое, иначе первая же проверка
  // видит изменение, которого не было.
  const past = new Date(Date.now() - 1000)
  fs.utimesSync(filepath, past, past)
  return filepath
}

// Собирает аргументы колбэка наблюдателя за duration мс. Проверки идут после,
// в теле теста, где их видит раннер: expect внутри колбэка улетает мимо
// промиса и превращается в unhandled error, а тест при этом остаётся зелёным.
const collectCalls = (filepath, period, duration) =>
  new Promise((resolve) => {
    const calls = []
    const id = watch(filepath, period, (err) => calls.push(err))
    setTimeout(() => {
      clearInterval(id)
      resolve(calls)
    }, duration)
  })

test('watch', async () => {
  const calls = await collectCalls('/undefined', 4, 200)
  expect(calls[0]).toMatchObject({ code: 'ENOENT' })
})

test('watch 2', async () => {
  const filepath = prepareFileSync(2)
  setTimeout(() => fs.appendFileSync(filepath, 'ehu'), 700)
  const calls = await collectCalls(filepath, 500, 1200)
  expect(calls).toEqual([null])
})

test('watch 3', async () => {
  // файл никто не меняет, поэтому колбэк не должен вызываться ни разу
  const calls = await collectCalls('/etc/hosts', 100, 300)
  expect(calls).toEqual([])
})

test('watch 4', async () => {
  const filepath = prepareFileSync(4)
  setTimeout(() => fs.appendFileSync(filepath, 'ehu'), 700)
  setTimeout(() => fs.appendFileSync(filepath, 'uhe'), 1100)
  // второе изменение видно на проверке в 1500 мс, окно с запасом на дрейф таймера
  const calls = await collectCalls(filepath, 500, 2000)
  expect(calls).toEqual([null, null])
})

test('watch 5: cb should be called once', async () => {
  const filepath = prepareFileSync(5)
  setTimeout(() => fs.appendFileSync(filepath, 'ehu'), 300)
  const calls = await collectCalls(filepath, 500, 1100)
  expect(calls).toEqual([null])
})

test('watch 6', async () => {
  const filepath = prepareFileSync(6)
  setTimeout(() => fs.unlink(filepath, () => {}), 700)
  // ошибка приходит на проверке в 1000 мс. Если таймер после неё не остановлен,
  // проверка в 1500 мс даёт вторую ошибку, поэтому окно берём с запасом
  const calls = await collectCalls(filepath, 500, 2000)
  expect(calls).toHaveLength(1)
  expect(calls[0].code).toBe('ENOENT')
})

test('watch 7', async () => {
  const filepath = prepareFileSync(7)
  // два изменения внутри одного периода дают один вызов колбэка
  setTimeout(() => fs.appendFileSync(filepath, 'ehu'), 100)
  setTimeout(() => fs.appendFileSync(filepath, 'abc'), 300)
  const calls = await collectCalls(filepath, 500, 1100)
  expect(calls).toEqual([null])
})
