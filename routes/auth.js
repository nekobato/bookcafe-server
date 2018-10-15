const Router = require('koa-router')
const passport = require('passport')

const router = new Router()

router.post('/login',
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/'
  })
)

router.post('/logout', (ctx) => {
  ctx.logout()
  ctx.redirect('/')
})

module.exports = router
