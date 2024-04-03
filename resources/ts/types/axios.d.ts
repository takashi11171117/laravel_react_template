import axios from 'axios'

declare module 'axios' {
  interface AxiosResponse<T = any> {
    meta: {
      current_page: number
      last_page: number
      total: number
      from: number
      to: number
    }
  }
}
