const mongoose = require('mongoose')

const biddings = new mongoose.Schema({
  bidVal: { type: Number, required: true },
  consumerId: { type: String, required: true },
  consumerName : { type: String },
  productId: { type: String, required: true },
  productName: {type: String},
  status: { type: String, required: true },
  sellerId: {type: String}
},
{
  versionKey: false
})

module.exports = mongoose.model('biddings', biddings)
