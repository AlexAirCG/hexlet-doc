import getBadLinks from '../../src/chapter_Asynchronous_Programming_JS/trial-13.js'

test('/', async () => {
  const url = `http://localhost:${process.env.WEB_PORT}`
  const links = await getBadLinks(url)
  expect(Array.isArray(links)).toBe(true)
  const expected = [`http://localhost:${process.env.WEB_PORT}/second`]
  expect(links.sort()).toEqual(expected.sort())
})

test('/first', async () => {
  const url = `http://localhost:${process.env.WEB_PORT}/first`
  const links = await getBadLinks(url)
  expect(Array.isArray(links)).toBe(true)
  const expected = [
    `http://localhost:${process.env.WEB_PORT}/pages/products`,
    `http://localhost:${process.env.WEB_PORT}/pages/reports`,
    `http://localhost:${process.env.WEB_PORT}/pages/users`,
  ]
  expect(links.sort()).toEqual(expected.sort())
})
