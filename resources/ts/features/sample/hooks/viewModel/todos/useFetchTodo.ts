import { useTodoQuery } from '@/features/sample/hooks/api/todos/hooks'

export const useFetchTodo = (todoId: number) => {
  const { data, isLoading, isError } = useTodoQuery({ todoId })

  const todo = data

  return { todo, isLoading, isError }
}
