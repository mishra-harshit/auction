const CustomerClass = require('../../../services/Users/Customers')

const customers = new CustomerClass()
const controller = {}

controller.getCustomer = async (req, res) => {
  try {
    const id = req.params.id
    const response = await customers.getById(id)
    res.json(response)
  } catch (err) {
    res.status(502)
  }
}

controller.login = async (req, res) => {
  try {
    const { username, password } = req.body
    const response = await customers.login(username, password)
    res.json(response)
  } catch (err) {
    res.status(502)
  }
}

controller.signUp = async (req, res) => {
  const { username, password } = req.body
  try {
    const response = await customers.signUp(username, password)
    res.json(response)
  } catch (err) {
    res.status(502)
  }
}

module.exports = controller
