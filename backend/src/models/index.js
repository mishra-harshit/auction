const mongoose = require('mongoose')
const customerModel = require('./customers')
const sellerModel = require('./sellers')
const adminModel = require('./admins')
const productModel = require('./products')
const biddingModel = require('./bidding')

mongoose.connect('mongodb://localhost:27017/ecom')

module.exports = {
  customerModel,
  sellerModel,
  adminModel,
  productModel,
  biddingModel
}
