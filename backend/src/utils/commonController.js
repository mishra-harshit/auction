const appConfig = require('../config/app.config')
const controller = {}

controller.index = (req, res) => res.json({ version: appConfig.version })

module.exports = controller
