import axios, { AxiosRequestConfig, AxiosRequestHeaders, AxiosInstance } from 'axios'
import { API_DOMAIN } from './config'
import QueryString from 'qs'
import { checkRedirect } from '@utils/index'
import storage from '@utils/storage'
import { Toast } from 'antd-mobile'
interface RequestConfig extends AxiosRequestConfig {
  headers: AxiosRequestHeaders;
}
const defaultConfig: RequestConfig = {
  baseURL: API_DOMAIN,
  timeout: 120 * 1000,
  withCredentials: true,
  headers: {
    'content-type': 'application/json',
  },
}
const request = (method: 'get' | 'post', url: string, params?: any, config?: AxiosRequestConfig): any => {
  const finalConfig: RequestConfig = { ...defaultConfig, ...config }
  const instance: AxiosInstance = axios.create(finalConfig)
  instance.interceptors.request.use((req: AxiosRequestConfig<any>) => {
    const isLogin = storage.get('userInfo') && storage.get('userInfo').id;
    if (!isLogin) {
      checkRedirect()
      return Promise.reject('未登录')
    }
    return req
  },
    error => {
      return Promise.reject(error)
    }
  )

  instance.interceptors.response.use(
    response => {
      if (response.status === 200 && response.data.success) {
        return response.data
      } else {
        Toast.show(response.data.errorMsg);
        return Promise.reject(response.data)
      }
    },
    error => {
      return Promise.reject(error)
    }
  )
  Object.keys(params as object).forEach(item => {
    if (item && (params[item] === undefined || params[item] === null)) {
      delete params[item]
    }
  })
  const data = ['application/json', 'multipart/form-data'].includes((finalConfig.headers['content-type'])?.toString()) ? params : QueryString.stringify(params)

  return instance({
    method,
    url,
    params: method === 'get' && params,
    data: method === 'post' && data,
  })
}
export default request
