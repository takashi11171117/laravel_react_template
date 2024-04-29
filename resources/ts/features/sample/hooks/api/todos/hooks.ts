import { useQuery, useMutation } from '@tanstack/react-query'
import { updateTodo } from '@/features/sample/hooks/api/todos/updateTodo'
import { storeImageForTodo } from '@/features/sample/hooks/api/todos/storeImageForTodo'
import { updateImageForTodo } from '@/features/sample/hooks/api/todos/updateImageForTodo'
import { deleteImageForTodo } from '@/features/sample/hooks/api/todos/deleteImageForTodo'
import { storePDFForTodo } from '@/features/sample/hooks/api/todos/storePDFForTodo'
import { fetchTodos, fetchTodosPaginated } from '@/features/sample/hooks/api/todos/fetchTodos'
import {
  FetchTodoDTO,
  fetchTodo,
} from '@/features/sample/hooks/api/todos/fetchTodo'
import { createTodo } from '@/features/sample/hooks/api/todos/createTodo'
import { deleteTodo } from '@/features/sample/hooks/api/todos/deleteTodo'
import { todosKeys } from '@/features/sample/hooks/api/todos/todosKeys'
import {
  ExtractFnReturnType,
  MutationConfig,
  QueryConfig,
} from '@/lib/reactQuery'

type FetchTodosFnType = typeof fetchTodos
type FetchTodosOptions = {
  config?: QueryConfig<FetchTodosFnType>
}
export const useTodosQuery = (options?: FetchTodosOptions) => {
  return useQuery<ExtractFnReturnType<FetchTodosFnType>>({
    queryKey: todosKeys.all,
    queryFn: fetchTodos,
    ...options,
  })
}

export const useTodosQueryPaginated = (page: number, pageSize: number, options?: FetchTodosOptions) => {
  return useQuery<ExtractFnReturnType<FetchTodosFnType>>({
    queryKey: todosKeys.all,
    queryFn: () => fetchTodosPaginated(page,pageSize),
    ...options,
  })
}

type CreateTodoOptions = {
  config?: MutationConfig<typeof createTodo>
}
export const useCreateTodoMutation = (options?: CreateTodoOptions) => {
  return useMutation({
    mutationFn: createTodo,
    mutationKey: todosKeys.all,
    ...options,
  })
}

type DeleteTodoOptions = {
  config?: MutationConfig<typeof deleteTodo>
}
export const useDeleteTodoMutation = (options?: DeleteTodoOptions) => {
  return useMutation({
    mutationFn: deleteTodo,
    mutationKey: todosKeys.all,
    ...options,
  })
}

type FetchTodoFnType = typeof fetchTodo
type FetchTodoOptions = {
  config?: QueryConfig<FetchTodoFnType>
}
export const useTodoQuery = (
  { todoId }: FetchTodoDTO,
  options?: FetchTodoOptions,
) => {
  return useQuery<ExtractFnReturnType<FetchTodoFnType>>({
    queryKey: [...todosKeys.each, todoId],
    queryFn: async () => fetchTodo({ todoId }),
    ...options,
  })
}

type UpdateTodoOptions = {
  config?: MutationConfig<typeof updateTodo>
}
export const useUpdateTodoMutation = (options?: UpdateTodoOptions) => {
  return useMutation({
    mutationFn: updateTodo,
    mutationKey: todosKeys.each,
    ...options,
  })
}

type StoreImageForTodoOptions = {
  config?: MutationConfig<typeof storeImageForTodo>
}
export const useStoreImageForTodoMutation = (
  options?: StoreImageForTodoOptions,
) => {
  return useMutation({
    mutationFn: storeImageForTodo,
    mutationKey: todosKeys.each,
    ...options,
  })
}

type UpdateImageForTodoOptions = {
  config?: MutationConfig<typeof updateImageForTodo>
}
export const useUpdateImageForTodoMutation = (
  options?: UpdateImageForTodoOptions,
) => {
  return useMutation({
    mutationFn: updateImageForTodo,
    mutationKey: todosKeys.each,
    ...options,
  })
}

type DeleteImageForTodoOptions = {
  config?: MutationConfig<typeof deleteImageForTodo>
}
export const useDeleteImageForTodoMutation = (
  options?: DeleteImageForTodoOptions,
) => {
  return useMutation({
    mutationFn: deleteImageForTodo,
    mutationKey: todosKeys.each,
    ...options,
  })
}

type StorePDFForTodoOptions = {
  config?: MutationConfig<typeof storePDFForTodo>
}
export const useStorePDFForTodoMutation = (
  options?: StorePDFForTodoOptions,
) => {
  return useMutation({
    mutationFn: storePDFForTodo,
    mutationKey: todosKeys.each,
    ...options,
  })
}
