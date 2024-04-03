import { useUpdateImageForTodoMutation } from '@/features/sample/hooks/api/todos/hooks'

export const useUpdateImageForTodo = () => {
  const { mutateAsync } = useUpdateImageForTodoMutation()

  const updateImageForTodoMutateAsync = mutateAsync

  return { updateImageForTodoMutateAsync }
}
