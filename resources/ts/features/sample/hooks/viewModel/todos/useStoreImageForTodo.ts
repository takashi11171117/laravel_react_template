import { useStoreImageForTodoMutation } from '@/features/sample/hooks/api/todos/hooks'

export const useStoreImageForTodo = () => {
  const { mutateAsync } = useStoreImageForTodoMutation()

  const storeImageForTodoMutateAsync = mutateAsync

  return { storeImageForTodoMutateAsync }
}
