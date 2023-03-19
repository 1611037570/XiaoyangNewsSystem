import Request from "./request"

const request = new Request({
  baseURL: "http://127.0.0.1",
  timeout: 10000,
  headers: {
    "Content-type": "application/json;charset=UTF-8",
    "Access-Control-Allow-Origin": "*"
  },
  interceptors: {
    requestInterceptor: (config) => {
      // if (token) {
      // }
      // console.log("请求成功")
      return config
    },
    requestInterceptorCatch: (err) => {
      console.log("请求失败", err)
      return err
    },
    responseInterceptor: (res) => {
      console.log("响应成功")
      return res
    },
    responseInterceptorCatch: (err) => {
      console.log("响应失败", err)
      return err
    }
  }
})
export default request
