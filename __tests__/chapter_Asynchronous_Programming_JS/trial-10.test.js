import path from 'path'
import fs from 'fs'
import os from 'os'
import { getDirectorySize } from '../../src/chapter_Asynchronous_Programming_JS/trial-10.js'

const getPath = (dirpath) => path.join('__fixtures__', dirpath)

test('getDirectorySize 1', () => {
  const dirpath = getPath('/undefined')
  const promise = getDirectorySize(dirpath)
  return expect(promise).rejects.toThrow()
})

test('getDirectorySize 2', () => {
  const dirpath = fs.mkdtempSync(path.join(os.tmpdir(), 'hexlet-empty-'))
  const promise = getDirectorySize(dirpath)
  return expect(promise).resolves.toBe(0)
})

test('getDirectorySize 3', () => {
  const dirpath = getPath('/usr/local/bin')
  const promise = getDirectorySize(dirpath)
  return expect(promise).resolves.toBe(1237)
})

test('getDirectorySize 4', () => {
  const dirpath = getPath('/usr/local/lib')
  const promise = getDirectorySize(dirpath)
  return expect(promise).resolves.toBe(0)
})
