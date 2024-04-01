import { useStoreImageForTodoMutation } from '@/api/todos/hooks'

export const useStoreImageForTodo = () => {
  const { mutateAsync } = useStoreImageForTodoMutation();

  const storeImageForTodoMutateAsync = mutateAsync

  return { storeImageForTodoMutateAsync  };
};

