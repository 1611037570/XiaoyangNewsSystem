import axios from "axios"
<<<<<<< HEAD
import type { AxiosInstance } from "axios"
import { DEAFULT_LADING, type XyRequestConfig, type XyRequestInterceptors } from "./type"

class XyRequest {
  instance: AxiosInstance // axios实例
  interceptors?: XyRequestInterceptors // 单例拦截器
  loading?: any // 加载动画实例
  isLoading: boolean = DEAFULT_LADING // 加载状态 防止重复进行加载动画
  showLoading: boolean = DEAFULT_LADING // 否开启加载动画
  constructor(config: XyRequestConfig) {
    this.instance = axios.create(config)
    this.interceptors = config.interceptors
    this.alone()
    this.all()
  }
  // 单例拦截
  alone() {
    // 注册单例请求拦截
    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptor,
      this.interceptors?.requestInterceptorCatch
    )
    // 注册单例响应拦截
    this.instance.interceptors.response.use(
      this.interceptors?.responseInterceptor,
      this.interceptors?.responseInterceptorCatch
    )
  }
  // 全局拦截
  all() {
    // 注册全局请求拦截
    this.instance.interceptors.request.use(
      (config: any) => {
        // 不存在加载中的时候在调用加载动画
        if (this.showLoading && this.isLoading) {
          // this.loading = ElLoading.service({
          //   lock: true,
          //   text: "Loading",
          //   background: "rgba(0, 0, 0, 0.7)"
          // })
          this.isLoading = false
        }
        return config
      },
      (err) => {
        return err
      }
    )
    // 注册全局响应拦截
    this.instance.interceptors.response.use(
      (res: any) => {
        this.loading?.close()
        this.isLoading = DEAFULT_LADING
        return res
      },
      (err) => {
        this.loading?.close()
        this.isLoading = DEAFULT_LADING
=======
import type { AxiosRequestConfig, AxiosInstance, AxiosResponse } from "axios"

interface InterceptorHooks {
  requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig
  requestInterceptorCatch?: (error: any) => any

  responseInterceptor?: (response: AxiosResponse) => AxiosResponse
  responseInterceptorCatch?: (error: any) => any
}

interface RequestConfig extends AxiosRequestConfig {
  interceptorHooks?: InterceptorHooks
}

interface Data<T> {
  data: T
  code: boolean
}

class Request {
  config: AxiosRequestConfig
  interceptorHooks?: InterceptorHooks
  instance: AxiosInstance

  constructor(options: RequestConfig) {
    this.config = options
    this.interceptorHooks = options.interceptorHooks
    this.instance = axios.create(options)

    this.setupInterceptor()
  }

  setupInterceptor(): void {
    this.instance.interceptors.request.use(this.interceptorHooks?.requestInterceptorCatch)
    this.instance.interceptors.response.use(
      this.interceptorHooks?.responseInterceptor,
      this.interceptorHooks?.responseInterceptorCatch
    )

    this.instance.interceptors.request.use((config) => {
      return config
    })

    this.instance.interceptors.response.use(
      (res) => {
        return res
      },
      (err) => {
>>>>>>> dc327334474ef505714dc5b2cd003fea2812ae54
        return err
      }
    )
  }

<<<<<<< HEAD
  // 网络请求
  request<T = any>(config: XyRequestConfig): Promise<T> {
    return new Promise((resolve, reject) => {
      // 单独请求拦截
      config = config.interceptors?.requestInterceptor
        ? config.interceptors.requestInterceptor(config)
        : config
      // 是否关闭加载动画
      this.showLoading = config.showLoading == false ? false : true
      this.instance
        .request<T, any>(config)
        .then((res) => {
          // 单独响应拦截
          res = config.interceptors?.responseInterceptor
            ? config.interceptors.responseInterceptor(res)
            : res
          this.showLoading = DEAFULT_LADING // 还原状态
          resolve(res)
        })
        .catch((err) => {
          this.showLoading = DEAFULT_LADING // 还原状态
=======
  request<T = any>(config: RequestConfig): Promise<T> {
    return new Promise((resolve, reject) => {
      this.instance
        .request<any>(config)
        .then((res: any) => {
          resolve(res)
        })
        .catch((err) => {
>>>>>>> dc327334474ef505714dc5b2cd003fea2812ae54
          reject(err)
        })
    })
  }

<<<<<<< HEAD
  get<T = any>(config: XyRequestConfig): Promise<T> {
    return this.request({ ...config, method: "GET" })
  }

  post<T = any>(config: XyRequestConfig): Promise<T> {
    return this.request({ ...config, method: "POST" })
  }

  delete<T = any>(config: XyRequestConfig): Promise<T> {
    return this.request({ ...config, method: "DELETE" })
  }

  patch<T = any>(config: XyRequestConfig): Promise<T> {
=======
  get<T = any>(config: RequestConfig): Promise<T> {
    return this.request({ ...config, method: "GET" })
  }

  post<T = any>(config: RequestConfig): Promise<T> {
    return this.request({ ...config, method: "POST" })
  }

  delete<T = any>(config: RequestConfig): Promise<T> {
    return this.request({ ...config, method: "DELETE" })
  }

  patch<T = any>(config: RequestConfig): Promise<T> {
>>>>>>> dc327334474ef505714dc5b2cd003fea2812ae54
    return this.request({ ...config, method: "PATCH" })
  }
}

<<<<<<< HEAD
export default XyRequest
=======
export default Request
>>>>>>> dc327334474ef505714dc5b2cd003fea2812ae54
