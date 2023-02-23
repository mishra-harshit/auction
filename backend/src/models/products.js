const mongoose = require('mongoose')

const products = new mongoose.Schema({
  name: { type: String, required: true },
  minPrice: { type: Number, required: true },
  picture: { type: String, required: true },
  category: { type: String },
  seller_id: { type: String, required: true },
  status: { type: String, required: true }
},
{
  versionKey: false
})

module.exports = mongoose.model('products', products)
