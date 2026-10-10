import http from 'http'

const pages = {
  '/': '<a href="/first">first</a> <a href="/second">second</a>',
  '/first': `
    <a href="/">home</a>
    <a href="/about">about</a>
    <a href="/contacts">contacts</a>
    <a href="/pages/products">products</a>
    <a href="/pages/users">users</a>
    <a href="/pages/reports">reports</a>
  `,
  '/about': '<h1>About</h1>',
  '/contacts': '<h1>Contacts</h1>',
}

http
  .createServer((req, res) => {
    const body = pages[req.url]
    if (body === undefined) {
      res.writeHead(404)
      return res.end('Not found')
    }
    res.writeHead(200, { 'Content-Type': 'text/html' })
    res.end(body)
  })
  .listen(8080, () => console.log('http://localhost:8080'))