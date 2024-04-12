import { Link } from 'react-router-dom'
import { useQueryClient } from '@tanstack/react-query'
import { useDeleteImageForTodo } from '@/features/sample/hooks/viewModel/todos/useDeleteImageForTodo'
import { todosKeys } from '@/features/sample/hooks/api/todos/todosKeys'

type Props = {
  todoId: number
  imageId: number
}

export const DeleteImageInfoButton = ({ todoId, imageId }: Props) => {

  const queryClient = useQueryClient()
  const { deleteImageForTodoMutateAsync } = useDeleteImageForTodo()

  const handleImageForTodoDeletion = async (
    todoId: number,
    imageId: number,
  ) => {
    try {
      await deleteImageForTodoMutateAsync({ todoId, imageId })

      await queryClient.invalidateQueries({ queryKey: todosKeys.each })
    } catch (error) {
      console.error('画像の削除に失敗しました:', error)
    }
  }

  return (
    <div>
      <button
            onClick={() => {
              console.log(`todoId = ${todoId}, imageId = ${imageId} `)
              handleImageForTodoDeletion(todoId, imageId)
            }}
            type="button">
            画像を削除
          </button>
    </div>
  )
}