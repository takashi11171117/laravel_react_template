import { useTodosQuery, useTodosQueryPaginated } from '@/features/sample/hooks/api/todos/hooks'

export const useFetchTodos = () => {
  const { data, isLoading, isError } = useTodosQuery()

  return { data, isLoading, isError }
}

export const useFetchTodosPaginated = (page: number, per_page: number ) => {
  const { data, isLoading, isError } = useTodosQueryPaginated(page,per_page)

  return { data, isLoading, isError }
}
