const { productModel,biddingModel } = require('../../models')

module.exports = class Products {
  constructor () {
    this.model = productModel
  }

  async create (obj) {
    try {
      console.log(obj)
      const item = await this.model.create(obj)
      return item
    } catch (err) {
      throw new Error('DB Error')
    }
  }

  async getById (id) {
    try {
      const item = this.model.findById(id)
      if (!item) {
        return { message: 'User does not exist' }
      } else {
        return item
      }
    } catch (err) {
      throw new Error('DB Error')
    }
  }

  async getAll (filter) {
    try {
      if (!filter) {
        const items = await this.model.find()
        return { data: items }
      }
      const items = await this.model.find(filter)
      return { data: items }
    } catch (err) {
      throw new Error('Something went wrong')
    }
  }

  async delete (id) {
    try {
      await this.model.deleteOne({ _id: id })
      await biddingModel.deleteMany({productId: id})
      return { message: 'Success' }
    } catch (err) {
      throw new Error('DB Error')
    }
  }
}
