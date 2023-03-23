import Request from "./request/request"

const request = new Request({
  baseURL: "http://127.0.0.1:3000",
  timeout: 10000,
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
