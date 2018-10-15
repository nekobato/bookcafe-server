const fs = require('fs')

function dirExists (dir) {
  if (!fs.existsSync(dir)) return false
  if (!fs.statSync(dir).isDirectory()) return false
  return true
}

module.exports = directory = {
  async init (directories) {

    for (let dirname in directories) {
      if (fs.existsSync(directories[dirname])) continue
      fs.mkdirSync(directories[dirname])
      if (!dirExists(directories[dirname])) throw `Error: failed to make directory ${dirname}`
    }

    return true
  }
}
