const fs = require('fs')

module.exports = {
  accessOrMakeDir (dir) {
    return new Promise((resolve, reject) => {
      fs.access(dir, (err) => {
        if (err) {
          fs.mkdir(dir, (err) => {
            if (err) throw err
            resolve(dir)
          })
        } else {
          resolve(dir)
        }
      })
    })
  },
  zeroPadding (num, padding) {
    return (padding + num.toString()).slice(-3)
  }
}
