import axios from 'axios'
import type { AxiosInstance } from 'axios'
import type { TLRequestInterceptors, TLRequestConfig } from './type'

import { ElLoading } from 'element-plus'
import { ILoadingInstance } from 'element-plus/lib/el-loading/src/loading.type'

const DEFAULT_LOADING = true

// 在类里封装axios请求
class TLRequest {
  // instance实例
  instance: AxiosInstance
  // 拦截器
  interceptors?: TLRequestInterceptors
  showLoading: boolean
  loading?: ILoadingInstance

  // 构造函数定义默认的属性
  constructor(config: TLRequestConfig) {
    // 创建axios实例
    this.instance = axios.create(config)
    // 保存基本信息
    this.interceptors = config.interceptors
    this.showLoading = config.showLoding ?? DEFAULT_LOADING

    // 使用拦截器
    // 1. 从config中取出的拦截器是对应的实例拦截器
    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptor,
      this.interceptors?.requestInterceptorCatch
    )
    this.instance.interceptors.response.use(
      this.interceptors?.responsetInterceptor,
      this.interceptors?.responseInterceptorCatch
    )

    // 2. 添加所有实例都有的拦截器
    this.instance.interceptors.request.use(
      (config) => {
        // console.log('所有的实例都有的拦截器：请求拦截成功')
        // 判断是否显示加载画面
        if (this.showLoading) {
          this.loading = ElLoading.service({
            lock: true,
            text: '拼命加载中',
            background: 'rgba(0, 0, 0, 0.5)'
          })
        }
        return config
      },
      (err) => {
        // console.log('所有的实例都有的拦截器：请求拦截失败')
        return err
      }
    )

    this.instance.interceptors.response.use(
      (res) => {
        // console.log('所有的实例都有的拦截器：响应拦截成功')

        // 将loading移除
        this.loading?.close()

        const data = res.data
        // console.log(data)
        if (data.returnCode === '-1001') {
          console.log('请求失败，错误信息')
        } else {
          return data
        }
        // return data
      },
      (err) => {
        // 将loading移除
        this.loading?.close()
        // 例子：判断不同的HttpErrorCode显示不同的错误信息
        if (err.response.status === 404) {
          console.log('404错误')
        }
        // console.log('所有的实例都有的拦截器：响应拦截失败')
        return err
      }
    )
  }

  // 发送请求
  request<T>(config: TLRequestConfig<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      // 1. 单个请求对请求config的处理
      // 单独的拦截器
      if (config.interceptors?.requestInterceptor) {
        config = config.interceptors.requestInterceptor(config)
      }

      // 判断是否显示loading，进行处理
      if (config.showLoding === false) {
        this.showLoading = config.showLoding
      }

      this.instance
        .request<any, T>(config)
        .then((res) => {
          // 1.单个数据的请求处理
          if (config.interceptors?.responsetInterceptor) {
            res = config.interceptors.responsetInterceptor(res)
          }
          // console.log(res)

          // 2.请求结束后，再把showLoding设置为初始值，这样才不会影响下一个请求
          this.showLoading = DEFAULT_LOADING

          // 3.将结果resolve返回出去
          resolve(res)
        })
        .catch((err) => {
          // 请求结束后，再把showLoding设置为初始值，这样才不会影响下一个请求
          this.showLoading = DEFAULT_LOADING
          reject(err)
          return err
        })
    })
  }

  get<T>(config: TLRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'GET' })
  }

  post<T>(config: TLRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'POST' })
  }

  delete<T>(config: TLRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'DELETE' })
  }

  patch<T>(config: TLRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'PATCH' })
  }
}

export default TLRequest
