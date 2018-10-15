const path = require('path')
const fs = require('fs')
const _ = require('lodash')
const Router = require('koa-router')
const { Book } = require('../models')
const config = require('../config')

const BOOK_LIMIT = 32

const router = new Router()

router.get('/books', async (ctx, next) => {
  let page = ctx.query.page ? Number(ctx.query.page) : 1

  let resData = {
    page: page,
    limit: BOOK_LIMIT,
    offset: BOOK_LIMIT * (page - 1),
    count: null,
    books: []
  }

  try {
    resData.count = await Book.count()

    resData.books = await Book.find(null, null, {
      limit: resData.limit,
      skip: resData.offset
    }).populate('author')

    ctx.body = resData
  } catch (error) {
    next(error)
  }
})

router.get('/book/:uuid', async (ctx, next) => {
  try {
    const book = await Book.findOne({ uuid: req.params.uuid }).populate('author')
    const files = await fs.readdir(path.join(config.dir.small, ctx.query.uuid))
    const pages = _.filter(files, file => {
      return /\.(jpg|png)$/.test(file)
    })
    ctx.body = pages
  } catch (error) {
    next(error)
  }
})

router.get('/authors', async (ctx, next) => {
  try {
    const authors = await Author.find()
    ctx.body = authors
  } catch (error) {
    next(error)
  }
})

router.post('/author/:uuid', async (ctx, next) => {
  try {
    await Author.findOneAndUpdate({ uuid: req.params.uuid }, req.body)
    ctx.body = { success: true }
  } catch (error) {
    next(error)
  }
})

module.exports = router
