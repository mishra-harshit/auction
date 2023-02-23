const express = require('express')
const biddings = require('./biddings.controller')

const router = express.Router()

// router.get('/:id', biddings.getById)
router.post('/create', biddings.create)
router.get('/product/:ProductId', biddings.getAll)
router.get('/seller/:sellerId', biddings.getBySellerId)
router.get('/approveBid/:id', biddings.approveBid)
router.get('/customer/:id', biddings.customerCart)

module.exports = router
