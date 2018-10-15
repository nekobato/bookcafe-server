module.exports.dirName2BookInfo = function (fileName) {
  let match = fileName.match(/^\[.*\]/)
  if (!match) return {
    author: null,
    title: fileName
  }
  return {
    author: match[0].replace(/\[|\]/g, ""),
    title: fileName.replace(/^\[.*\] /, "")
  }
}
