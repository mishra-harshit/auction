const { sellerModel } = require('../../models')
const Users = require('./Base/UsersBase')

module.exports = class Customers extends Users {
  constructor () {
    super(sellerModel)
  }
}
