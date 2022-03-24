// Service统一出口
import TLRequest from './request'
import { BASE_URL, TIME_OUT } from './request/config'
import localCache from '@/utils/cache'

// 创建axios的实例对象（可以创建多个实例）
const tlRequest = new TLRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  // 添加拦截器
  interceptors: {
    requestInterceptor: (config) => {
      // 携带token的拦截
      const token = localCache.getCache('token')
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }

      // console.log('请求成功的拦截')
      return config
    },
    requestInterceptorCatch: (err) => {
      // console.log('请求失败的拦截')
      return err
    },
    responsetInterceptor: (config) => {
      // console.log('响应成功的拦截')
      return config
    },
    responseInterceptorCatch: (err) => {
      // console.log('响应失败的拦截', err)
      return err
    }
  }
})

export default tlRequest
