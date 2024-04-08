import { axios } from '@/lib/axios'

export const me = async () => {
  try {
    const response = await axios.get<User>(`/me`)
    return response.data
  } catch (error) {
    console.error('データを取得できませんでした:', error)
    throw new Error('データの取得に失敗しました')
  }
}
