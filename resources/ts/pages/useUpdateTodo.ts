import { useUpdateTodoMutation } from '@/api/todos/hooks'

export const useUpdateTodo = () => {
  const { mutateAsync } = useUpdateTodoMutation();

  const updateTodoMutateAsync = mutateAsync

  return { updateTodoMutateAsync  };
};