const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const customers = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true }
},
{
  versionKey: false
})

customers.pre('save', async function (next) {
  try {
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(this.password, salt)
    this.password = hashedPassword
    next()
  } catch (err) {
    next(err)
  }
})

customers.methods.isValidPassword = async function (password) {
  try {
    return await bcrypt.compare(password, this.password)
  } catch (err) {
    console.log(err)
  }
}

module.exports = mongoose.model('customers', customers)
