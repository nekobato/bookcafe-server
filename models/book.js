const { Schema } = require("mongoose");
const util = require("./utils");

const BookSchema = new Schema({
  uuid: {
    type: String,
    unique: true
  },
  title: {
    type: String,
    unique: true
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: "Author"
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  converted_at: {
    type: Date
  }
});

BookSchema.static("findOneOrCreate", async book => {
  const found = await this.findOne({
    title: book.title
  });

  if (found) {
    return found;
  }

  return this.create({
    uuid: util.createUuid(32),
    title: book.title,
    author: book.author
  });
});

BookSchema.static("updateConverted", async book => {
  return this.findOneAndUpdate(
    {
      _id: book._id
    },
    {
      converted_at: Date.now()
    }
  );
});

BookSchema.static("findNotConverted", async () => {
  return this.find({
    converted_at: null
  });
});

module.exports = BookSchema;
