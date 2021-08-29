import { AxiosRequestConfig, AxiosResponse } from 'axios'

// 自定义一个拦截器的接口
export interface TLRequestInterceptors<T = AxiosResponse> {
  // 请求成功的拦截
  requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig
  // 请求失败的拦截
  requestInterceptorCatch?: (error: any) => any

  // 响应成功的拦截
  responsetInterceptor?: (res: T) => T
  // 响应失败的拦截
  responseInterceptorCatch?: (error: any) => any
}

// 自定义requestConfig接口， 继承AxiosRequestConfig
export interface TLRequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
  interceptors?: TLRequestInterceptors<T>
  showLoding?: boolean
}
