const commonController = require('./commonController')
const customerController = require('../routes/v1/customers/customer.controller')
const sellerController = require('../routes/v1/sellers/seller.controller')
const adminController = require('../routes/v1/admins/admin.controller')
module.exports = {
  commonController,
  customerController,
  sellerController,
  adminController
}
