import axios from 'axios'

export const api = axios.create({
  baseURL: '/api',
  timeout: 8000,
})

api.interceptors.response.use(
  (res) => res,
  (err) => {
    const msg = err?.response?.data?.message || err?.message || '请求失败'
    return Promise.reject(new Error(msg))
  },
)

