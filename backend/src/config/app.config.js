const packageJson = require('../../package.json')
const version = packageJson.version
const port = process.env.PORT

module.exports = {
  version,
  port
}
