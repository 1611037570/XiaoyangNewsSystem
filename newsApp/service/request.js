import axios from "axios"
class Request {
  instance
  interceptors

  // 初始化
  constructor(config) {
    if (config) {
      this.instance = axios.create(config)
      if (config.interceptors) {
        this.interceptors = config.interceptors
        this.exampleInterceptors()
      }
    } else {
      this.instance = axios.create({
        baseURL: "/api",
        timeout: 10000
      })
    }
    this.globalInterceptors()
  }
  // 实例拦截器
  exampleInterceptors() {
    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptor,
      this.interceptors?.requestInterceptorCatch
    )
    this.instance.interceptors.response.use(
      this.interceptors?.responseInterceptor,
      this.interceptors?.responseInterceptorCatch
    )
  }
  // 全局拦截器
  globalInterceptors() {
    this.instance.interceptors.request.use(
      (config) => {
        return config
      },
      (err) => {
        return err
      }
    )
    this.instance.interceptors.response.use(
      (res) => {
        return res.data
      },
      (err) => {
        return err
      }
    )
  }

  // 请求和请求拦截
  request(config) {
    return new Promise((resolve, reject) => {
      this.instance
        .request(config)
        .then((res) => {
          resolve(res)
        })
        .catch((err) => {
          reject(err)
        })
    })
  }
  get(config) {
    return this.request({ ...config, method: "GET" })
  }
  post(config) {
    return this.request({ ...config, method: "POST" })
  }
  delete(config) {
    return this.request({ ...config, method: "DELETE" })
  }
  patch(config) {
    return this.request({ ...config, method: "PATCH" })
  }
}

export default Request
