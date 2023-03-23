import axios from "axios"
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
        return err
      }
    )
  }

  request<T = any>(config: RequestConfig): Promise<T> {
    return new Promise((resolve, reject) => {
      this.instance
        .request<any>(config)
        .then((res: any) => {
          resolve(res)
        })
        .catch((err) => {
          reject(err)
        })
    })
  }

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
    return this.request({ ...config, method: "PATCH" })
  }
}

export default Request
