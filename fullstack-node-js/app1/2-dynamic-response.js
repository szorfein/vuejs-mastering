const http = require('http')
// parsing and formatiing url string
const querystring = require('node:querystring')

const port = process.env.PORT || 1337

const server = http.createServer((req, res) => {
  if (req.url.match(/^\/echo/)) return respondEcho(req, res)

  respondNotFound(req, res)
})

function respondEcho(req, res) {
  const { input = '' } = querystring.parse(req.url
                                              .split('?')
                                              .slice(1)
                                              .join(''))
  res.setHeader('Content-Type', 'application/json')
  res.end(JSON.stringify({
    normal: input,
    shouty: input.toUpperCase(),
    characterCount: input.length,
    backwards: input.split('')
                    .reverse()
                    .join('')
    // input is the query string url e.g /echo?input=fullstack
    // backwards: ordered input in reverse
  }))
}

function respondNotFound(req, res) {
  res.writeHead(404, { 'Content-Type': 'text-plain' })
  res.end('Not found')
}

server.listen(port)
console.log(`Server listen on port ${port}.`)
