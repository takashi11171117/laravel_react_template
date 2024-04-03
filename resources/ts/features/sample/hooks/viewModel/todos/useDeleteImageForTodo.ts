import { useDeleteImageForTodoMutation } from '@/features/sample/hooks/api/todos/hooks'

export const useDeleteImageForTodo = () => {
  const { mutateAsync } = useDeleteImageForTodoMutation()

  const deleteImageForTodoMutateAsync = mutateAsync

  return { deleteImageForTodoMutateAsync }
}
