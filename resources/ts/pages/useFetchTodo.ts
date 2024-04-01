import { useTodoQuery } from '@/api/todos/hooks';

export const useFetchTodo = (id:number) => {
  const { data, isLoading, isError } = useTodoQuery(id);

  const todo = data;

  return { todo, isLoading, isError  };
};