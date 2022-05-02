// const path = require('path')

module.exports = {
  outputDir: './build',
  // publicPath: './',
  devServer: {
    // 配置webpack，解决跨域问题
    proxy: {
      '^/api': {
        // 接口地址
        target: 'http://120.79.177.110:8001',
        pathRewrite: {
          '^/api': ''
        },
        changeOrigin: true
      }
    }
  },
  configureWebpack: {
    resolve: {
      alias: {
        views: '@/views'
      }
    }
  }
  // configureWebpack: (config) => {
  //   config.resolve.alias = {
  //     '@': path.resolve(__dirname, 'src'),
  //     views: '@/views'
  //   }
  // },
  // chainWebpack: (config) => {
  //   config.resolve.alias
  //     .set('@', path.resolve(__dirname, 'src'))
  //     .set('views', '@/views')
  // }
}
