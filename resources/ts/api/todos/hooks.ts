import axios from 'axios';
import { fetchTodos } from '@/api/todos/fetchTodos';
import { fetchTodo } from '@/api/todos/fetchTodo';
import { createTodo } from '@/api/todos/createTodo';
import { deleteTodo } from '@/api//todos/deleteTodo'; 
import { todosKeys } from "@/api/todos/todosKeys";
import { AxiosError } from "axios";
import { useQuery, useMutation, UseQueryOptions,UseMutationOptions} from '@tanstack/react-query';
import { updateTodo } from '@/api/todos/updateTodo';
import { storeImageForTodo } from '@/api/todos/storeImageForTodo';
import { updateImageForTodo } from '@/api/todos/updateImageForTodo';
import { deleteImageForTodo } from '@/api/todos/deleteImageForTodo';
import { storePDFForTodo } from '@/api/todos/storePDFForTodo';

export const useTodosQuery = <TData = Todo[]>(
  options?: Omit<
    UseQueryOptions<Todo[], AxiosError, TData, typeof todosKeys.all>,
    "queryKey" | "queryFn"
  >
) => {
  return useQuery({queryKey: todosKeys.all, queryFn: fetchTodos, ...options });
};

export const useCreateTodoMutation = (
  options?: Omit<
    UseMutationOptions<void, AxiosError, { name: string; content: string }, typeof todosKeys.all>,
    "mutationKey" | "mutationFn"
  >
) => {
  return useMutation({ mutationFn: createTodo, mutationKey: todosKeys.all, ...options });
};

export const useDeleteTodoMutation = (
  options?: Omit<
    UseMutationOptions<void, AxiosError, { id: number }, typeof todosKeys.all>,
    "mutationKey" | "mutationFn"
  >
) => {
  return useMutation({ mutationFn: deleteTodo, mutationKey: todosKeys.all, ...options });
};

export const useTodoQuery = <TData = Todo>(
  todoId: number,
  options?: Omit<
    UseQueryOptions<Todo, AxiosError, TData>,
    "queryKey" | "queryFn"
  >
) => {
  return useQuery({queryKey: [todosKeys.each[0], todoId], queryFn: async () => fetchTodo(todoId), ...options });
};

export const useUpdateTodoMutation = (
  options?: Omit<
    UseMutationOptions<void, AxiosError, { name: string; content: string; todoId:number}>,
    "mutationKey" | "mutationFn"
  >
) => {
  return useMutation({ mutationFn: updateTodo, mutationKey: [todosKeys.each[0]], ...options });
};

export const useStoreImageForTodoMutation = (
  options?: Omit<
    UseMutationOptions<void, AxiosError, { title: string; filename: string; image: File | null; todoId:number }>,
    "mutationKey" | "mutationFn"
  >
) => {
  return useMutation({ mutationFn: storeImageForTodo, mutationKey: [todosKeys.each[0]], ...options });
};

export const useUpdateImageForTodoMutation = (
  options?: Omit<
    UseMutationOptions<void, AxiosError, { updatedTitle: string; updatedFilename: string; image: File | null; todoId:number; imageId: number }>,
    "mutationKey" | "mutationFn"
  >
) => {
  return useMutation({ mutationFn: updateImageForTodo, mutationKey: [todosKeys.each[0]], ...options });
};

export const useDeleteImageForTodoMutation = (
  options?: Omit<
    UseMutationOptions<void, AxiosError, { todoId:number; imageId: number }>,
    "mutationKey" | "mutationFn"
  >
) => {
  return useMutation({ mutationFn: deleteImageForTodo, mutationKey: [todosKeys.each[0]], ...options });
};

export const useStorePDFForTodoMutation = (
  options?: Omit<
    UseMutationOptions<void, AxiosError, { todoContent:string; todoId:number }>,
    "mutationKey" | "mutationFn"
  >
) => {
  return useMutation({ mutationFn: storePDFForTodo, mutationKey: [todosKeys.each[0]], ...options });
};


