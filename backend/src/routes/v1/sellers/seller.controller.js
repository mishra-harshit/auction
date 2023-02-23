const SellerClass = require('../../../services/Users/Sellers')

const sellers = new SellerClass()
const controller = {}

controller.getSeller = async (req, res) => {
  try {
    const id = req.params.id
    const response = await sellers.getById(id)
    res.json(response)
  } catch (err) {
    res.status(502)
  }
}

controller.login = async (req, res) => {
  try {
    const { username, password } = req.body
    const response = await sellers.login(username, password)
    res.json(response)
  } catch (err) {
    res.status(502)
  }
}

controller.signUp = async (req, res) => {
  const { username, password } = req.body
  try {
    const response = await sellers.signUp(username, password)
    res.json(response)
  } catch (err) {
    res.status(502)
  }
}

module.exports = controller
