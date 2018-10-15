const { Schema } = require('mongoose')

const AdminSchema = new Schema({
  is_converting: {
    type: Boolean,
    default: false
  }
})

module.exports = AdminSchema
