import { axios } from '@/lib/axios'

export type FetchTodoDTO = {
  todoId: number
}

export const fetchTodo = async ({ todoId }: FetchTodoDTO) => {
  try {
    const response = await axios.get<Todo>(`/todos/${todoId}`)
    return response.data
  } catch (error) {
    console.error('データを取得できませんでした:', error)
    throw new Error('データの取得に失敗しました')
  }
}
