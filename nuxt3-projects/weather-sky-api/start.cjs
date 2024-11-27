const fastify = require('fastify')

const serverOptions = {
  logger: {
    level: 'debug'
  }
}

const app = fastify(serverOptions)

app.addHook('onRequest', async (req, res) => {
  const origin = req.headers.origin

  res.header('Access-Control-Allow-Origin', origin || '*')
  res.header('Access-Control-Allow-Methods',
             'POST, GET, PUT, DELETE, OPTIONS, XMODIFY')
  res.header('Access-Control-Allow-Credential', 'true')
  res.header('Access-Control-Max-Age', '86400')
  res.header('Access-Control-Allow-Headers',
             'X-Requested-With X-HTTP-Method-Override, Content-Type, Accept')
})

app.route({
  url: '/',
  method: 'GET',
  handler: function myHandler(req, res) {
    const { q, apikey } = req.query
    //res.header('Access-Control-Allow-Origin', '*')
    res.send([
      { name: 'London', country: 'England' },
      { name: 'Chelsea', country: 'England' },
      { name: 'Paris', country: 'France' },
      { name: 'hi', country: 'ho' },
      { name: 'hi', country: 'ho' }
    ])
    console.log(JSON.stringify(req.headers))
    console.log(`query = ${q} >>>>> api = ${apikey}`)
  }
})

app.route({
  url : '/:id',
  method: 'GET',
  handler: async function myHandler(req, res) {
    const city = req.params.id
    const { apikey } = req.query
    switch (city) {
      case 'London':
        res.send({ lang: 'english', timezone: 'Europe/London' })
        break
      case 'Chelsea':
        res.send({ lang: 'english', timezone: 'Europe/London' })
        break
      case 'Paris':
        res.send({ lang: 'french', timezone: 'Europe/Paris' })
        break
      default:
        res.code(404)
           .send({ error: 'not register yet' })
    }
  }
})

app.listen({ port: 8080, host: '0.0.0.0' })
   .then((addr) => {
     console.log(`listening on ${addr}`)
   })
