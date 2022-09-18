const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = function (app) {
  app.use(createProxyMiddleware('/nan_qiao', {
    target : 'http://47.100.31.167:8081',
    changeOrigin : true,
    // ws: true,
    // pathRewrite : {
    //     '^/api/v1' : ''
    // },
  }))
}