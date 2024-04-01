import axios from 'axios';
import { useQuery, useMutation,useQueryClient } from '@tanstack/react-query';
import { useTodosQuery } from '@/api/todos/hooks';

const todoListTranslator = (todos: Todo[]): Todo[] =>{
  return todos;
}

export const useFetchTodos = () => {
  const { data, isLoading, isError } = useTodosQuery<Todo[]
  >({
    select: todoListTranslator,
  });

  const todos = data;

  return { todos, isLoading, isError  };
};