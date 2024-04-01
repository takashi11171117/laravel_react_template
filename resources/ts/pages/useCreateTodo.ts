import { useCreateTodoMutation } from '@/api/todos/hooks'

export const useCreateTodo = () => {
  const { mutateAsync } = useCreateTodoMutation();

  const createMutateAsync = mutateAsync

  return { createMutateAsync  };
};