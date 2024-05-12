import { 
  useTodosQuery, 
  useTodosQueryPaginated,
  useTodosQueryPaginatedSorted, 
  useTodosQueryFiltered, 
  useTodosQueryPaginatedSortedFiltered
} from '@/features/sample/hooks/api/todos/hooks'

export const useFetchTodos = () => {
  const { data, isLoading, isError } = useTodosQuery()

  return { data, isLoading, isError }
}

export const useFetchTodosPaginated = (page: number, per_page: number ) => {
  const { data, isLoading, isError } = useTodosQueryPaginated(page,per_page)

  return { data, isLoading, isError }
}

export const useFetchTodosPaginatedSorted = (page: number, per_page: number, sortBy:string, sortOrder: 'asc' | 'desc' = 'asc' ) => {
  const { data, isLoading, isError } = useTodosQueryPaginatedSorted(page,per_page, sortBy, sortOrder )

  return { data, isLoading, isError }
}

export const useFetchTodosFiltered = (keyword:string ) => {
  const { data, isLoading, isError } = useTodosQueryFiltered(keyword )

  const dataFiltered = data;

  const isLoadingFiltered = isLoading;

  const isErrorFiltered = isError;

  return { dataFiltered, isLoadingFiltered, isErrorFiltered }
}

export const useFetchTodosPaginatedSortedFiltered = (page: number, per_page: number, sortBy:string, sortOrder: 'asc' | 'desc' = 'asc',keyword:string = "" ) => {
  const { data, isLoading, isError } = useTodosQueryPaginatedSortedFiltered(page,per_page, sortBy, sortOrder, keyword )

  return { data, isLoading, isError }
}

