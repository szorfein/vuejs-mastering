const
express = require('express'),
path = require('path'),
fs = require('fs').promises,
api = require('./api'),
middleware = require('./middleware')

const
app = express(),
port = process.env.PORT || 1337

app.use(middleware.cors)
app.get('/products', api.listProducts)
app.get('/product/:id', api.getProduct)
app.use(middleware.handleError)
app.use(middleware.notFound)

app.listen(port, () => console.log(`Server listening on port ${port}`))
