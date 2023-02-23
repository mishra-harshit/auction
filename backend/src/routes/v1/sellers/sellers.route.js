const express = require('express')
const sellerController = require('./seller.controller')

const router = express.Router()
router.get('/:id', sellerController.getSeller)
router.post('/signup', sellerController.signUp)
router.post('/login', sellerController.login)
module.exports = router
