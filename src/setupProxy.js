const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = function (app) {
  app.use(createProxyMiddleware('/nan_qiao', {
    target : 'http://yilitaozi.com',
    changeOrigin : true,
    // ws: true,
    // pathRewrite : {
    //     '^/api/v1' : ''
    // },
  }))
}