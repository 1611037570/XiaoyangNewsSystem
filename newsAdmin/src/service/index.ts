import XyRequest from "./request/request"
const request = new XyRequest({
  baseURL: "http://127.0.0.1:3000",
  timeout: 10000,
  headers: {
    "Content-type": "application/json;charset=UTF-8",
    "Access-Control-Allow-Origin": "*"
  },
  interceptors: {
    requestInterceptor: (config: any) => {
      // token
      // const token = window.localStorage.getItem("token")
      // if (token) {
      //   config.headers.Authorization = `Bearer ${token}`
      // }
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
