import Request from "./request/request"
console.log("111 :>> ")

const request = new Request({
  baseURL: "http://127.0.0.1:3000",
  timeout: 10000,
  headers: {
    "Content-type": "application/json;charset=UTF-8",
    "Access-Control-Allow-Origin": "*"
  },
  interceptorHooks: {
    requestInterceptor: (config) => {
      return config
    },
    requestInterceptorCatch: (err) => {
      return err
    },
    responseInterceptor: (res) => {
      return res.data
    },
    responseInterceptorCatch: (err) => {
      return err
    }
  }
})

export default request
