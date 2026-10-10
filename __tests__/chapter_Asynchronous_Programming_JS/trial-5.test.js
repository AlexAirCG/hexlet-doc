import path from 'path'
import fs from 'fs'
import os from 'os'
import { getDirectorySize } from '../../src/chapter_Asynchronous_Programming_JS/trial-5.js'

const getPath = (dirPath) => path.join('__fixtures__', dirPath)

test('getDirectorySize', () =>
  new Promise((done) => {
    const dirPath = getPath('/undefined')
    getDirectorySize(dirPath, (err) => {
      expect(err).not.toBeNull()
      done()
    })
  }))

test('getDirectorySize2', () =>
  new Promise((done) => {
    const dirpath = fs.mkdtempSync(path.join(os.tmpdir(), 'hexlet-empty-'))
    getDirectorySize(dirpath, (err, size) => {
      expect(err).toBeNull()
      expect(size).toBe(0)
      done()
    })
  }))

test('getDirectorySize3', () =>
  new Promise((done) => {
    const dirPath = getPath('/usr/local/bin')
    getDirectorySize(dirPath, (err, size) => {
      expect(err).toBeNull()
      expect(size).toBe(1237)
      done()
    })
  }))

test('getDirectorySize4', () =>
  new Promise((done) => {
    const dirPath = getPath('/usr/local/lib')
    getDirectorySize(dirPath, (err, size) => {
      expect(err).toBeNull()
      expect(size).toBe(0)
      done()
    })
  }))
