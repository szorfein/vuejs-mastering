const http = require('http')
const port = process.env.PORT || 1337
const fs = require('fs')

const server = http.createServer((req, res) => {
  // req http://localhost:1337/static/ember.png
  if (req.url.match(/\/static/)) return respondStatic(req, res)

  respondNotFound(req, res)
})

function respondStatic(req, res) {
  const filename = `${__dirname}/public${req.url.split('/static')[1]}`
  console.log(`filename is ${filename}`)
  fs.createReadStream(filename)
    .on('error', () => respondNotFound(req, res))
    .pipe(res)
}

function respondNotFound(req, res) {
  res.writeHead(404, { 'Content-Type': 'text-plain' })
  res.end('failure')
}

server.listen(port)
console.log(`Server listen on port ${port}`)
