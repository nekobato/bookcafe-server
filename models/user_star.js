// UserがStarを付けたBookについて

const { Schema } = require('mongoose')

const UserStarSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  stars: [{
    type: Schema.Types.ObjectId,
    ref: 'Book'
  }]
})

module.exports = UserStarSchema
