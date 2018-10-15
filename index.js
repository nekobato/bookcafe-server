const Koa = require('koa')
const session = require('koa-session')
const bodyParser = require('koa-bodyparser')
const passport = require('koa-passport')
const fs = require('fs')

const config = require('./config')

const app = new Koa()

app.proxy = true
app.keys = [config.appKey]

app.use(session({}, app))
app.use(bodyParser())
require('./auth')
app.use(passport.initialize())
app.use(passport.session())

// cors
if (process.env.NODE_ENV) {
  app.use(require('@koa/cors')())
}

// routes
const router = require('./routes')
app.use(router.routes())
app.use(router.allowedMethods())

// start server
const port = process.env.PORT || 3000
app.listen(port, () => console.log('Server listening on', port))
