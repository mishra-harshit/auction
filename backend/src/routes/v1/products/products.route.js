const express = require('express')
const products = require('./products.contoller')

const router = express.Router()

router.get('/:id', products.getById)
router.post('/create', products.create)
router.get('/', products.getAll)
router.post('/', products.getAll)
router.delete('/', products.delete)

module.exports = router
