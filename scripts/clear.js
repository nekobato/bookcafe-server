const { spawn } = require('child_process')
const path = require('path')
const config = require('../config')
const { Admin } = require('../models')

async function init () {
  let admin = await Admin.findOne()

  if (!admin) {
    admin = await new Admin().save()
  }

  if (admin.is_converting) {
    console.log('Scanning already started. Exit.')
    process.exit(1)
  }

  await run()

  return true
}

async function run () {
  let rmdir = spawn('rmdir', [path.join(config.dir.raw, '*')])

  rmdir.stdout.on('data', data => {
    return Promise.resolve(data)
  })

  rmdir.stderr.on('data', data => {
    return Promise.reject(err)
  })

  rmdir.on('close', code => {
    if (code === 1) return Promise.reject('rmdir command exited with code 1.')
  })
}

init()
  .then(result => {
    console.log('Clear completed.')
    process.exit(0)
  })
  .catch(err => {
    console.log(err)
    process.exit(1)
  })

