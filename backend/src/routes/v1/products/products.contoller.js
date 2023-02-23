const ProductClass = require('../../../services/Products/Products')

const products = new ProductClass()
const controller = {}

controller.getAll = async (req, res) => {
  const { filter } = req.body
  const productList = await products.getAll(filter)
  res.json(productList)
}

controller.getById = async (req, res) => {
  const { id } = req.params
  const item = await products.getById(id)
  res.json(item)
}

controller.create = async (req, res) => {
  try {
    const { productDetails } = req.body
    const success = await products.create(productDetails)
    if (!success) res.status(400).json({ message: 'Cannot create product' })
    res.json({ message: 'Success' })
  } catch (err) {
    res.status(400).json({ message: 'Cannot create product' })
  }
}

controller.delete = async (req, res) => {
  try {
    const { id } = req.body
    const success = await products.delete(id)
    if (!success) res.status(400).json({ message: 'Cannot create product' })
    res.json({ message: 'Success' })
  } catch (err) {
    res.status(400).json({ message: 'Cannot delete product' })
  }
}

module.exports = controller
