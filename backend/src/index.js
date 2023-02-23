require('dotenv').config()
const express = require('express')
const cors = require('cors')
const config = require('./config/app.config')
const routes = require('./routes')
const app = express()

app.use(cors())
app.use(express.json())

app.use('/', routes)
app.listen(config.port, () => {
  console.log(`App running on port ${config.port}`)
})
