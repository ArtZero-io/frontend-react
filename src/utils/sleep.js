function sleep(ms) {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      resolve()
    }, ms)
  })
}
export default sleep