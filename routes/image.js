const path = require('path')
const Router = require('koa-router')
const static = require('koa-static')
const config = require('../config')

const router = new Router()

router.get('/thumbnail/*', static(path.join(config.dir.thumbnail)))
router.get('/small/*', static(path.join(config.dir.small)))
router.get('/big/*', static(path.join(config.dir.big)))

module.exports = router
