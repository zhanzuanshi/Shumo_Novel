const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  // 关闭eslint校验.
  lintOnSave:false, //关闭eslint检查,
    assetsDir: 'static',
    parallel: false,
    publicPath: '/',

    // 开启代理解决跨域
  // devServer: {
  //   open: true, //是否自动弹出浏览器页面
  //   host: "192.168.1.230",
  //   port: '8888',
  //   proxy: {
  //     '/api': {
  //       target: 'http://localhost:3111', //API服务器的地址
  //       changeOrigin: true,
  //       pathRewrite: {
  //         '^/api': ''
  //       }
  //     }
  //   },
  // }


});
