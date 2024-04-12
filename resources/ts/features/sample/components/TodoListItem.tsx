import { Link } from 'react-router-dom'
import { useQueryClient } from '@tanstack/react-query'
import { useDeleteTodo } from '@/features/sample/hooks/viewModel/todos/useDeleteTodo'
import { todosKeys } from '@/features/sample/hooks/api/todos/todosKeys'

type Props = {
  todosInfo: Todo[]
}

export const TodoListItem = ({ todosInfo }: Props) => {

  const queryClient = useQueryClient()
  const { deleteMutateAsync } = useDeleteTodo()

  const handleTodoDeletion = async (id: number) => {
    try {
      await deleteMutateAsync({ id })

      await queryClient.invalidateQueries({ queryKey: todosKeys.all })
    } catch (error) {
      console.error('Todoの削除に失敗しました:', error)
    }
  }

  return (
    <div>
      <div>TodoListItem</div>
      {todosInfo.map((todo: Todo) => (
        <div key={todo.id}>
          <div>
            <p>{todo.id}</p>
            <Link to={`/app/todos/${todo.id}`} state={{ todoId: todo.id }}>
              {todo.name}
            </Link>
            <p>{todo.content}</p>
          </div>
          <div>
            <button onClick={() => handleTodoDeletion(todo.id)}>削除</button>
          </div>
        </div>
      ))}
    </div>
  )
}