const passport = require('koa-passport')
const PassportLocal = require('passport-local')
const { User } = require('./models')

const LocalStrategy = PassportLocal.Strategy

const fetchUser = ((username) => {
  return User.findOne({
    username: username
  })
})()

passport.serializeUser(function (user, done) {
  done(null, user.id)
})

passport.deserializeUser(async function (id, done) {
  try {
    const user = await fetchUser()
    done(null, user)
  } catch (err) {
    done(err)
  }
})

passport.use(new LocalStrategy(function (username, password, done) {
  fetchUser(username)
    .then(user => {
      if (username === user.username && password === user.password) {
        done(null, user)
      } else {
        done(null, false)
      }
    })
    .catch(err => done(err))
}))
