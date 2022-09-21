const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = function (app) {
  app.use(createProxyMiddleware('/nan_qiao', {
    target : 'https://nanqiao-gzh-7293-4-1314017345.sh.run.tcloudbase.com',
    changeOrigin : true,
    // ws: true,
    // pathRewrite : {
    //     '^/api/v1' : ''
    // },
  }))
}