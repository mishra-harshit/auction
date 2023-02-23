const AdminClass = require('../../../services/Users/Admin')

const admin = new AdminClass()
const controller = {}

controller.getAdmin = async (req, res) => {
  try {
    const id = req.params.id
    const response = await admin.getById(id)
    res.json(response)
  } catch (err) {
    res.status(502)
  }
}

controller.login = async (req, res) => {
  try {
    const { username, password } = req.body
    const response = await admin.login(username, password)
    res.json(response)
  } catch (err) {
    res.status(502)
  }
}

controller.signUp = async (req, res) => {
  const { username, password } = req.body
  try {
    const response = await admin.signUp(username, password)
    res.json(response)
  } catch (err) {
    res.status(502)
  }
}

module.exports = controller
