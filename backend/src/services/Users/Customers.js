const { customerModel } = require('../../models')
const Users = require('./Base/UsersBase')

module.exports = class Customers extends Users {
  constructor () {
    super(customerModel)
  }
}
