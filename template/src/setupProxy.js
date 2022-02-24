const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    createProxyMiddleware(['/business-cash-back-admin-web'], {
      target: 'http://ops.test.ximalaya.com/',
      secure: true,
      changeOrigin: true,
      cookieDomainRewrite: 'ops.test.ximalaya.com',
      pathRewrite: {},
    })
  );
};
