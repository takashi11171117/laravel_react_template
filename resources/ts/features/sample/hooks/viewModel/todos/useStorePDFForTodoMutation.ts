import { useStorePDFForTodoMutation } from '@/features/sample/hooks/api/todos/hooks'

export const useStorePDFForTodo = () => {
  const { mutateAsync } = useStorePDFForTodoMutation()

  const storePDFForTodoMutateAsync = mutateAsync

  return { storePDFForTodoMutateAsync }
}
