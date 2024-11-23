const
express = require('express')

const
app = express(),
port = process.env.PORT || 1337

app.get('/', (req, res) => {
  res.json('hi')
})

app.get('/user', (req, res) => {
  const b64auth = (req.headers.authorization || '').split('Basic ')[1] || ''
  const [ login, pass ] = Buffer.from(b64auth, 'base64').toString().split(':')
  if (login === 'myid' && pass === 'secret') {
    res.json({ status: 'success' })
  } else {
    res.end(`headers: ${JSON.stringify(req.headers)} + ${b64auth}\nCreds:${req.headers['authorization']} ${login} - ${pass}\nMethod: ${req.method}\nReq: ${req.path} - ${req.url}\nIP: ${req.headers['x-forwarded-for']}`)
  }
})

app.listen(port, () => console.log('started'))
