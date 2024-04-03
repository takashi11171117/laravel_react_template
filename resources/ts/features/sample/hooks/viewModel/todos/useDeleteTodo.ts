import { useDeleteTodoMutation } from '@/features/sample/hooks/api/todos/hooks'

export const useDeleteTodo = () => {
  const { mutateAsync } = useDeleteTodoMutation()

  const deleteMutateAsync = mutateAsync

  return { deleteMutateAsync }
}
