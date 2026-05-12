/**
 * @jest-environment jsdom
 */

import extractLinks from '../src/extractLinks.js'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

test('extractLinks', () => {
  const filePath = path.join(__dirname, '..', '__fixtures__', 'withLinks.html')
  const html = fs.readFileSync(filePath, 'utf-8')

  const links = extractLinks(html)

  expect(links).toEqual(['/resumes/1', '/users/6'])
})
