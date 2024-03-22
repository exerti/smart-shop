import store from '@/store'
import axios from 'axios'
import { Toast } from 'vant'

const request = axios.create({
  baseURL: 'http://cba.itlike.com/public/index.php?s=/api/',
  timeout: 5000

})

request.interceptors.request.use(
  config => {
    Toast.loading({
      message: '加载中...',
      forbidClick: true,
      loadingType: 'spinner'
    })
    const token = store.getters.token
    if (token) {
      config.headers['Access-Token'] = token
      config.headers.platform = 'h5'
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

request.interceptors.response.use(
  response => {
    const res = response.data
    if (res.status !== 200) {
      Toast(res.message)
      return Promise.reject(res.message)
    } else {
      Toast.clear()
    }
    return response.data
  }
  , error => {
    return Promise.reject(error)
  }
)

export default request
