
module.exports = class User {
  constructor (model) {
    this.model = model
  }

  async getById (id) {
    const user = await this.model.findById(id)
    if (!user) return { message: 'User does not exist' }
    else {
      const { _id, username: uname } = user
      return { _id, username: uname }
    }
  }

  async login (username, password) {
    try {
      const user = await this.model.findOne({
        username
      })
      if (!user) return { message: 'User does not exist' }
      const validPassword = await user.isValidPassword(password)
      if (!validPassword) return { message: 'Incorrect Username or Password' }
      else {
        const { _id, username: uname } = user
        return { _id, username: uname }
      }
    } catch (err) {
      console.log(err)
      throw new Error('DB Error')
    }
  }

  async signUp (username, password) {
    try {
      const user = await this.model.create({
        username, password
      })
      const { _id, username: uname } = user
      return { _id, username: uname }
    } catch (err) {
      if (err.code === 11000) return { message: 'Username Exists' }
      throw new Error('DB Error')
    }
  }
}
