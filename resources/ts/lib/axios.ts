import Axios, { AxiosRequestConfig } from 'axios'

import { API_URL } from '@/config'

export const axios = Axios.create({
  baseURL: API_URL,
})

axios.interceptors.response.use(
  (response: { data: any }) => {
    return response.data
  },
  (error: { response: { data: { message: any } }; message: any }) => {
    const message = error.response?.data?.message || error.message

    return Promise.reject(error)
  },
)
