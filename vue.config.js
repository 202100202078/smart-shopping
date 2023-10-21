const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  publicPath: './',
  transpileDependencies: true,
  devServer: {
    open: true, // 编译后默认打开浏览器
    historyApiFallback: true,
    allowedHosts: 'all'
  }
})
