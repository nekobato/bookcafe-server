// UserがSession内でBookを見たLogs

const { Schema } = require('mongoose')
const _ = require('lodash')

const UserBookLogSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  book_logs: [{
    book: {
      type: Schema.Types.ObjectId,
      ref: 'Book'
    },
    time: {
      // 秒数
      type: Number
    },
    page: {
      type: Number
    }
  }]
})

UserBookLogSchema.static('addLogs', function (user, bookLogs) {
  this.findOrCreateOne({ user: user._id })
    .then((userBookLog) => {
      userBookLog.update({
        book_logs: _.concat(this.book_logs, bookLogs)
      })
    })
})

UserBookLogSchema.static('findOrCreateOne', function (user) {
  return this.findOne({ user: user._id })
    .then(user => {
      if (user) {
        return user
      } else {
        return this.create({
          user: user._id,
          book_logs: []
        })
      }
    })
    .catch(err => { throw err })
})

module.exports = UserBookLogSchema
