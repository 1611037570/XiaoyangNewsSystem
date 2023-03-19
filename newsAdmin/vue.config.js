const { defineConfig } = require("@vue/cli-service")
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: {
      "/api": {
        target: "http://127.0.0.1:80/", //请求后台接口
        changeOrigin: true, // 允许跨域
        pathRewrite: {
          "^/api": "" // 重定向删除/api
        }
      }
    }
  }
})
