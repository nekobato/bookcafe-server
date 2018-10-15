const bcrypt = require('bcryptjs')
const { Schema } = require('mongoose')

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    unique: true
  }
})

UserSchema.pre('save', function (next) {
  if (!/([a-zA-Z_0-9]|_)+/.test(this.username)) return next(new Error('Name cannot use !([a-zA-Z_0-9]|_)'))
  if (!/([a-zA-Z_0-9]|_)+/.test(this.password)) return next(new Error('Password cannot use !([a-zA-Z_0-9]|_)'))

  let salt = bcrypt.genSaltSync(10)
  this.password = bcrypt.hashSync(this.password, salt)

  next()
})

UserSchema.method('verifyPassword', function (password) {
  return bcrypt.compareSync(password, this.password)
})

module.exports = UserSchema
