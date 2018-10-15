const path = require('path')

const baseDir = `${__dirname}/../Books`

module.exports = {
  appKey: 'app-secret-key',
  dir: {
    base: baseDir,
    src: path.join(baseDir, "src"),
    small: path.join(baseDir, "small"),
    big: path.join(baseDir, "big"),
    thumbnail: path.join(baseDir, "thumbnail"),
    raw: path.join(baseDir, "raw"),
  },
  size: {
    small: {
      width: 360,
      height: 640
    },
    big: {
      width: 1080,
      height: 1920
    },
    thumbnail: {
      width: 200,
      height: 360
    }
  },
  admin: {
    secret: 'bookcafe'
  }
}
