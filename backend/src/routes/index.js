const express = require('express')
const controller = require('../utils')
const v1 = require('./v1')

const router = express.Router({ mergeParams: true })

router.use('/v1', v1)

router.use('/', controller.commonController.index)

module.exports = router
