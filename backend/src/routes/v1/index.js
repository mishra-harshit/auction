const express = require('express')
const customers = require('./customers/customers.route')
const sellers = require('./sellers/sellers.route')
const admins = require('./admins/admins.route')
const products = require('./products/products.route')
const bids = require('./biddings/biddings.route')
const { route } = require('./customers/customers.route')

const router = express.Router({ mergeParams: true })

router.use('/customers', customers)
router.use('/sellers', sellers)
router.use('/admins', admins)
router.use('/products', products)
router.use('/bids', bids)

module.exports = router
