import { test, expect, vi, beforeEach } from 'vitest'
import fs from 'fs'
import readUserNames from './readUserNames.js'

vi.mock('fs')

beforeEach(() => {
  vi.resetAllMocks()
})

test('readUserNamesVirtual', () => {
  const fakePasswdContent = 'ivan:x:1001\nelena:x:1002\nadmin:x:1000'
  vi.spyOn(fs, 'readFileSync').mockReturnValue(fakePasswdContent)
  const result = readUserNames('/etc/passwd')

  expect(result).toEqual(['ivan', 'elena', 'admin'])

  expect(fs.readFileSync).toHaveBeenCalledWith('/etc/passwd', 'utf-8')
})
