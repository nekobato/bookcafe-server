const dir = require('./directory-initializer')
const src = require('./book-scanner')
const { Admin } = require('../models')
const config = require('../config')

async function init () {
  let admin = await Admin.findOne()

  if (!admin) {
    admin = await new Admin().save()
  }

  if (admin.is_converting) {
    console.log('Scanning already started. Exit.')
    process.exit(1)
  }

  await admin.update({ is_converting: true })

  // 初期ディレクトリの作成
  await dir.init(config.dir)
  await src.init()

  await admin.update({ is_converting: false })

  return true
}

init()
  .then(result => {
    console.log('scannig completed.')
    process.exit(0)
  })
  .catch(err => {
    console.log(err)
    process.exit(1)
  })
