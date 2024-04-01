import { useStorePDFForTodoMutation } from '@/api/todos/hooks'

export const useStorePDFForTodo = () => {
  const { mutateAsync } = useStorePDFForTodoMutation();

  const storePDFForTodoMutateAsync = mutateAsync

  return { storePDFForTodoMutateAsync  };
};
