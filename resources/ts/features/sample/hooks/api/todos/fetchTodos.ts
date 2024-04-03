import { axios } from '@/lib/axios'
import { AxiosResponse } from 'axios'

type FetchTodosResponse = Record<'items', Todo[]>

export const fetchTodos = async () => {
  try {
    const response = await axios.get<FetchTodosResponse>('/todos')
    return response
  } catch (error) {
    console.error('データを取得できませんでした:', error)
    throw new Error('データの取得に失敗しました')
  }
}
