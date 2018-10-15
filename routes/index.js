const Router = require('koa-router')
const static = require('koa-static')
const auth = require('./auth')
const api = require('./api')
// const admin = require('./admin')
const image = require('./image')

const router = new Router()

router.get('/*', static(__dirname + '/../../dist'))
router.use('auth', auth.routes())

router.get('/api/auth/status', (ctx) => {
  ctx.body = {
    data: {
      login: ctx.isAuthenticated()
    }
  }
})

router.use((ctx, next) => {
  if (ctx.isAuthenticated()) {
    return next()
  } else {
    ctx.status = 403
    ctx.body = { error: 'Not Authorized.' }
  }
})

router.use('api', api.routes())
// router.use('admin', admin.routes())
router.use('image', image.routes())

module.exports = router
