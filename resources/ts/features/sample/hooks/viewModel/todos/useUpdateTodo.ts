import { useUpdateTodoMutation } from '@/features/sample/hooks/api/todos/hooks'

export const useUpdateTodo = () => {
  const { mutateAsync } = useUpdateTodoMutation()

  const updateTodoMutateAsync = mutateAsync

  return { updateTodoMutateAsync }
}
