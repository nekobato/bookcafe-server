const mongoose = require('mongoose')
const debug = require('debug')('BookCafe:model')
const databaseConfig = require('./config')

mongoose.connect(databaseConfig.production.database, { useNewUrlParser: true }).then(() => {
  debug('connected mongodb.')
}).catch(() => {
  debug('connect to mongodb is failed.')
})

mongoose.Promise = global.Promise

module.exports = {
  AdminModel: mongoose.model('Admin', require('./admin')),
  BookModel: mongoose.model('Book', require('./book')),
  AuthorModel: mongoose.model('Author', require('./author')),
  UserModel: mongoose.model('User', require('./user')),
}

