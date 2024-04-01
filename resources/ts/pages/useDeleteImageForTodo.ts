import { useDeleteImageForTodoMutation } from '@/api/todos/hooks'

export const useDeleteImageForTodo = () => {
  const { mutateAsync } = useDeleteImageForTodoMutation();

  const deleteImageForTodoMutateAsync = mutateAsync

  return { deleteImageForTodoMutateAsync };
};

