import { axios } from '@/lib/axios'

export const fetchTodos = async () => {
  try {
    const response = await axios.get('/todos')
    return response
  } catch (error) {
    console.error('データを取得できませんでした:', error)
    throw new Error('データの取得に失敗しました')
  }
}
