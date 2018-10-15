
router.get('/authors', async function (ctx, next) {
  try {
    const authors = await Author.find()
    ctx.body = authors
  } catch (error) {
    next(error)
  }
})

router.post('/author/:uuid', async function (ctx, next) {
  try {
    await Author.findOneAndUpdate({ uuid: req.params.uuid }, req.body)
    ctx.body = { success: true }
  } catch (error) {
    next(error)
  }
})

module.exports = {
  getAuthors,
  getAuthor,
  postAuthor,
}
