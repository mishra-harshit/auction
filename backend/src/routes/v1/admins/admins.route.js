const express = require('express')
const adminController = require('./admin.controller')

const router = express.Router()
router.get('/:id', adminController.getAdmin)
router.post('/signup', adminController.signUp)
router.post('/login', adminController.login)
module.exports = router
