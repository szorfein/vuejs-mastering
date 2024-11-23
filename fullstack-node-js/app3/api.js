const Products = require('./products')

module.exports = {
  listProducts,
  createProduct,
  editProduct,
  deleteProduct,
  getProduct
}

async function listProducts(req, res) {
  const { offset = 0, limit = 25, tag } = req.query

  try {
    res.json(await Products.list({
      offset: Number(offset),
      limit: Number(limit),
      tag
    }))
  } catch(err) {
    res.status(500).json({ error: err.message })
  }
}

async function createProduct(req, res) {
  console.log('request body', req.body)
  res.json(req.body)
}

async function editProduct(req, res) {
  console.log('edit body', req.body)
  res.json(req.body)
}

async function deleteProduct(req, res) {
  console.log('delete body', req.body)
  res.json(req.body)
}

async function getProduct(req, res, next) {
  const { id } = req.param

  try {
    const product = await Products.get(id)
    if (!product) return next()

    res.json(product)
  } catch(err) {
    res.status(500).json({ error: err.message })
  }
}
