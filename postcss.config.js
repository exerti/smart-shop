// postcss.config.js
module.exports = {
  plugins: {
    'postcss-px-to-viewport': {
      // vw 适配的标准屏的宽度 ，通常就是使用iphonex的标准， 375
      viewportWidth: 375
    }
  }
}
