import { useTodosQuery } from '@/features/sample/hooks/api/todos/hooks'

type FetchTodosResponse = Record<'data', { items: Todo[] }> &
  Record<'meta', PaginateResponseMeta>

export const useFetchTodos = () => {
  const { data, isLoading, isError } = useTodosQuery<FetchTodosResponse>()

  return { data, isLoading, isError }
}
