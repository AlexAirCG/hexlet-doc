import os from 'os'
import fsp from 'fs/promises'
import { touch } from '../../src/chapter_Asynchronous_Programming_JS/trial-8.js'

test('touch 1', () => {
  const filepath = `${os.tmpdir()}/example`
  return fsp
    .unlink(filepath)
    .catch(() => {})
    .then(() => touch(filepath))
    .then(() => fsp.access(filepath))
    .then((data) => {
      expect(data).toBe()
    })
})

test('touch 2', () => {
  const filepath = `${os.tmpdir()}/example`
  return fsp
    .unlink(filepath)
    .catch(() => {})
    .then(() => fsp.writeFile(filepath, 'content'))
    .then(() => touch(filepath))
    .then(() => fsp.readFile(filepath, 'utf-8'))
    .then((data) => {
      expect(data).toBe('content')
    })
})

test('touch 3', () => {
  const filepath = `${os.tmpdir()}/example`
  return fsp
    .unlink(filepath)
    .catch(() => {})
    .then(() => fsp.writeFile(filepath, 'text'))
    .then(() => touch(filepath))
    .then(() => fsp.readFile(filepath, 'utf-8'))
    .then((data) => {
      expect(data).toBe('text')
    })
})
