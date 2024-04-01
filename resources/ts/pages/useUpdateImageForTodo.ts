import { useUpdateImageForTodoMutation } from '@/api/todos/hooks'

export const useUpdateImageForTodo = () => {
  const { mutateAsync } = useUpdateImageForTodoMutation();

  const updateImageForTodoMutateAsync = mutateAsync

  return { updateImageForTodoMutateAsync  };
};

