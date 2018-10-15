const { Schema } = require('mongoose')
const util = require('./utils')

const AuthorSchema = new Schema({
  uuid: {
    type: String,
    unique: true
  },
  name: {
    type: String,
    unique: true
  },
  main_uuid: Number,
  created_at: {
    type: Date,
    default: Date.now
  }
})

AuthorSchema.static('findOrCreate', function (author) {
  return this.findOne({ name: author.name })
    .then(data => {
      if (data) {
        return data
      } else {
        return this.create({
          uuid: util.createUuid(32),
          name: author.name,
          main_id: author.main_id || null
        })
      }
    })
})

module.exports = AuthorSchema
