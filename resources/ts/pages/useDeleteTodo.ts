import { useDeleteTodoMutation } from '@/api/todos/hooks'


export const useDeleteTodo = () => {
  const { mutateAsync } = useDeleteTodoMutation();

  const deleteMutateAsync = mutateAsync

  return { deleteMutateAsync  };
};