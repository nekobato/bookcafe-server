const fs = require('fs-extra')
const path = require('path')
const { BookModel } = require('../../models')
const Initializer = require('./')

describe('initializer', () => {
  const baseDir = path.join(__dirname + '/../../base')
  const initializer = new Initializer({
    baseDir
  })

  beforeAll(async () => {
    await fs.mkdirp(baseDir)
  })

  it('should can initDirs', async () => {
    const dirs = await initializer.initDirs()

    expect(fs.existsSync(baseDir)).toBeTruthy()
    expect(fs.existsSync(path.join(baseDir + '/raw'))).toBeTruthy()
    expect(fs.existsSync(path.join(baseDir + '/big'))).toBeTruthy()
    expect(fs.existsSync(path.join(baseDir + '/small'))).toBeTruthy()
    expect(fs.existsSync(path.join(baseDir + '/thumbnail'))).toBeTruthy()
    expect(fs.existsSync(path.join(baseDir + '/src'))).toBeTruthy()
  })

  // it('should can scanBooks from src', async () => {
  //   await fs.mkdirp(path.join(baseDir + '/src/hoge'))
  //   await fs.writeFile(path.join(baseDir + '/src/hoge/test.jpg'), '')

  //   await initializer.scanBooks()

  //   const book = BookModel.findOne({
  //     title: 'hoge'
  //   })

  //   expect(book.title).toBe('hoge')
  // });

  // it('convert images from db', async () => {
  //   await initializer.convertImages()

  //   expect(fs.existsSync(baseDir + '/src/hoge')).not.toBeTruthy()
  //   expect(fs.existsSync(baseDir + '/raw/hoge/001.jpg')).toBeTruthy()
  //   expect(fs.existsSync(baseDir + '/small/hoge/001.jpg')).toBeTruthy()
  //   expect(fs.existsSync(baseDir + '/big/hoge/001.jpg')).toBeTruthy()
  //   expect(fs.existsSync(baseDir + '/thumbnail/hoge/001.jpg')).toBeTruthy()
  // })

  afterAll(async () => {
    // BookModel.findAndDeleteOne({
    //   title: 'hoge'
    // })

    await fs.remove(path.join(baseDir, 'src/hoge'))
    await fs.remove(path.join(baseDir, 'raw/hoge'))
    await fs.remove(path.join(baseDir, 'small/hoge'))
    await fs.remove(path.join(baseDir, 'big/hoge'))
    await fs.remove(path.join(baseDir, 'thumbnail/hoge'))
  })
})
