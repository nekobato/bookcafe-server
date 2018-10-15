const path = require('path')
const fs = require('fs-extra')
const { BookModel } = require('../../models')
const { fileName2BookInfo } = require('../utils')

module.exports = class Initializer {
  constructor(options) {
    if (!options.baseDir) {
      throw Error('options.baseDir is required.');
    }

    this.baseDir = options.baseDir
    this.dirs = [
      'src',
      'raw',
      'small',
      'big',
      'thumbnail',
    ]
  }

  initDirs() {
    return Promise.all(this.dirs.map((dir) => {
      return fs.mkdirp(path.join(this.baseDir, dir))
    }))
  }

  async scanBooksFromSrc() {
    const srcDirents = await fs.readdir(path.join(this.baseDir, 'src'), { withFileTypes: true })

    Promise.all(srcDirents.map((dirent) => {
      if (!dirent.isDirectory()) continue
      return BookModel.findOrCreate(dirName2BookInfo(dirent.name))
    }))
  }

  async convertBook(book) {
    const files = path.join(this.baseDir, book.uuid)
    Promise.all(books.map((book) => {

      await converter.convertThumbnail(imagePath)
      await converter.convertSmall(imagePath)
      await converter.convertBig(imagePath)
    }))
    process.nextTick()
  }
}


