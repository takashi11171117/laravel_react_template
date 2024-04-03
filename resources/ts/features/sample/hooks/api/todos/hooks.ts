import { AxiosError } from 'axios'
import {
  useQuery,
  useMutation,
  UseQueryOptions,
  UseMutationOptions,
} from '@tanstack/react-query'
import {
  UpdateTodoDTO,
  updateTodo,
} from '@/features/sample/hooks/api/todos/updateTodo'
import {
  StoreImageForTodoDTO,
  storeImageForTodo,
} from '@/features/sample/hooks/api/todos/storeImageForTodo'
import {
  UpdateImageForTodoDTO,
  updateImageForTodo,
} from '@/features/sample/hooks/api/todos/updateImageForTodo'
import {
  DeleteImageForTodDTO,
  deleteImageForTodo,
} from '@/features/sample/hooks/api/todos/deleteImageForTodo'
import {
  StorePDFForTodoDTO,
  storePDFForTodo,
} from '@/features/sample/hooks/api/todos/storePDFForTodo'
import { fetchTodos } from '@/features/sample/hooks/api/todos/fetchTodos'
import {
  FetchTodoDTO,
  fetchTodo,
} from '@/features/sample/hooks/api/todos/fetchTodo'
import {
  CreateTodoDTO,
  createTodo,
} from '@/features/sample/hooks/api/todos/createTodo'
import {
  DeleteTodoDTO,
  deleteTodo,
} from '@/features/sample/hooks/api/todos/deleteTodo'
import { todosKeys } from '@/features/sample/hooks/api/todos/todosKeys'

export const useTodosQuery = <TData = Todo[]>(
  options?: Omit<
    UseQueryOptions<Todo[], AxiosError, TData, typeof todosKeys.all>,
    'queryKey' | 'queryFn'
  >,
) => {
  return useQuery({ queryKey: todosKeys.all, queryFn: fetchTodos, ...options })
}

export const useCreateTodoMutation = (
  options?: Omit<
    UseMutationOptions<void, AxiosError, CreateTodoDTO, typeof todosKeys.all>,
    'mutationKey' | 'mutationFn'
  >,
) => {
  return useMutation({
    mutationFn: createTodo,
    mutationKey: todosKeys.all,
    ...options,
  })
}

export const useDeleteTodoMutation = (
  options?: Omit<
    UseMutationOptions<void, AxiosError, DeleteTodoDTO, typeof todosKeys.all>,
    'mutationKey' | 'mutationFn'
  >,
) => {
  return useMutation({
    mutationFn: deleteTodo,
    mutationKey: todosKeys.all,
    ...options,
  })
}

export const useTodoQuery = <TData = Todo>(
  { todoId }: FetchTodoDTO,
  options?: Omit<
    UseQueryOptions<Todo, AxiosError, TData>,
    'queryKey' | 'queryFn'
  >,
) => {
  return useQuery({
    queryKey: [...todosKeys.each, todoId],
    queryFn: async () => fetchTodo({ todoId }),
    ...options,
  })
}

export const useUpdateTodoMutation = (
  options?: Omit<
    UseMutationOptions<void, AxiosError, UpdateTodoDTO>,
    'mutationKey' | 'mutationFn'
  >,
) => {
  return useMutation({
    mutationFn: updateTodo,
    mutationKey: todosKeys.each,
    ...options,
  })
}

export const useStoreImageForTodoMutation = (
  options?: Omit<
    UseMutationOptions<void, AxiosError, StoreImageForTodoDTO>,
    'mutationKey' | 'mutationFn'
  >,
) => {
  return useMutation({
    mutationFn: storeImageForTodo,
    mutationKey: todosKeys.each,
    ...options,
  })
}

export const useUpdateImageForTodoMutation = (
  options?: Omit<
    UseMutationOptions<void, AxiosError, UpdateImageForTodoDTO>,
    'mutationKey' | 'mutationFn'
  >,
) => {
  return useMutation({
    mutationFn: updateImageForTodo,
    mutationKey: todosKeys.each,
    ...options,
  })
}

export const useDeleteImageForTodoMutation = (
  options?: Omit<
    UseMutationOptions<void, AxiosError, DeleteImageForTodDTO>,
    'mutationKey' | 'mutationFn'
  >,
) => {
  return useMutation({
    mutationFn: deleteImageForTodo,
    mutationKey: todosKeys.each,
    ...options,
  })
}

export const useStorePDFForTodoMutation = (
  options?: Omit<
    UseMutationOptions<void, AxiosError, StorePDFForTodoDTO>,
    'mutationKey' | 'mutationFn'
  >,
) => {
  return useMutation({
    mutationFn: storePDFForTodo,
    mutationKey: todosKeys.each,
    ...options,
  })
}
