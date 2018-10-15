const fs = require('fs-extra')

function numberImage(oldDir, newDir) {
  const files = await fs.readdir(oldDir)

  return Promise.all(files.map((file, index) => {
    // dotfiles
    if (/^\./.test(file)) return
    // imagefiles
    if (!/\.(jpg|png|jpeg)$/i.test(file)) return
    // src/[hash]/001.[ext]
    const newFilePath = path.join(newDir, util.zeroPadding(index, '000') + _.toLower(path.extname(file)))
    // TODO: overwrite option
    if (await fs.pathExists(newFilePath)) return

    return fs.rename(path.join(oldDir, file), newFilePath)
  }))
}

module.exports = {
  numberImage
}
