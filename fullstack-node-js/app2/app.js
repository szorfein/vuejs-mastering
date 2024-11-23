const express = require('express')
const EventEmitter = require('events')
const fs = require('fs')

const app = express()
const port = process.env.PORT || 1337
const chatEmitter = new EventEmitter()

// Go to http://localhost:1337/chat?message=hello
chatEmitter.on('message', console.log)

app.get('/chat', respondChat)
app.get('/sse', respondSSE)
app.get('/static/*', respondStatic)

function respondChat(req, res) {
  const { message } = req.query
  chatEmitter.emit('message', message)
  res.end()
}

function respondSSE(req, res) {
  // 200 for initialte stream-event
  res.writeHead(200, { 'Content-Type': 'text/event-stream',
                       'Connection': 'keep-alive'
                     })
  // res.write send message to chat.html in the dom
  const onMessage = msg => res.write(`data: ${msg}\n\n`)
  chatEmitter.on('message', onMessage)

  // when someone leave, we end chatEmiiter event
  res.on('close', () => {
    chatEmitter.off('message', onMessage)
  })
}

function respondStatic(req, res) {
  const filename = `${__dirname}/public/${req.params[0]}`
  fs.createReadStream(filename)
    .on('error', () => respondNotFound(req, res))
    .pipe(res)
}

function respondNotFound(req, res) {
  res.writeHead(404, { 'Content-Type': 'text-plain' })
  res.end('Not found')
}

app.listen(port, () => console.log(`Server listen on port ${port}`))
