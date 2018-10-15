const mongoose = require('mongoose')

const CounterSchema = new mongoose.Schema({
  collection: {
    type: String,
    required: true,
    unique: true
  },
  count: {
    type: Number,
    required: true,
    default: 0
  }
})

CounterSchema.static('findOrCreate', function (book) {
  return this.findOne({ title: book.title })
    .then(data => {
      if (data) {
        return Promise.resolve(data)
      } else {
        return this.create({
          uuid: util.createUuid(32),
          title: book.title,
          author: book.author
        })
      }
    })
    .catch(err => {
      throw err
    })
})

const model = mongoose.model('Counter', eventSchema)

model.init().then(() => {

})

module.exports = UserSchema
