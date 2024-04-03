import { useTodosQuery } from '@/features/sample/hooks/api/todos/hooks'

export const useFetchTodos = () => {
  const { data, isLoading, isError } = useTodosQuery()

  return { data, isLoading, isError }
}
