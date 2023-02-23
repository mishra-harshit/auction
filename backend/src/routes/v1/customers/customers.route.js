const express = require('express')
const customerController = require('./customer.controller')

const router = express.Router()
router.get('/:id', customerController.getCustomer)
router.post('/signup', customerController.signUp)
router.post('/login', customerController.login)
module.exports = router
