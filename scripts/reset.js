const { Admin } = require('../models')
const config = require('../config')

async function init () {
  let admin = await Admin.findOne()

  if (!admin) {
    admin = await new Admin().save()
  }

  await admin.update({ is_converting: false })
  return true
}

init()
  .then(result => {
    console.log('reset completed.')
    process.exit(0)
  })
  .catch(err => {
    console.log(err)
    process.exit(1)
  })
