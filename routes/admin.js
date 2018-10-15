const express = require('express')
const router = express.Router()
const { User } = require('../models')
const cel = require('connect-ensure-login')

router.get('/init', function (req, res, next) {
  res.send('nothing...')
})

router.post('/user', function (req, res, next) {
  if (!cel.ensureLoggedIn()) return res.status(403).send({ error: 'Not Authenticated.' })

  User.create({
    username: req.body.username,
    password: req.body.password
  })
    .then(user => {
      res.send(user)
    })
    .catch(err => {
      next(err)
    })
})

router.get('/users', function (req, res, next) {
  if (!cel.ensureLoggedIn()) return res.status(403).send({ error: 'Not Authenticated.' })

  User.find()
    .select({
      _id: false,
      username: true
    })
    .then(users => {
      res.status(200).json(users)
    })
    .catch(err => {
      res.status(500).send({ error: err })
    })
})

module.exports = router
