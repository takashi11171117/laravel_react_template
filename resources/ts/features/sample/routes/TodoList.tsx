import { useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import { useFetchTodos } from '@/features/sample/hooks/viewModel/todos/useFetchTodos'
import { useCreateTodo } from '@/features/sample/hooks/viewModel/todos/useCreateTodo'
import { useDeleteTodo } from '@/features/sample/hooks/viewModel/todos/useDeleteTodo'
import { todosKeys } from '@/features/sample/hooks/api/todos/todosKeys'
import { TanStackTable } from '@/components/Elements/Table/TanStackTable'

export const TodoList = () => {
  const [name, setName] = useState('')
  const handleNameCreation = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value)
  }

  const [content, setContent] = useState('')
  const handleContentCreation = (e: React.ChangeEvent<HTMLInputElement>) => {
    setContent(e.target.value)
  }

  const queryClient = useQueryClient()

  const { data, isLoading, isError } = useFetchTodos()

  const { createMutateAsync } = useCreateTodo()
  const { deleteMutateAsync } = useDeleteTodo()

  const handleTodoCreation = async () => {
    try {
      if (name === '') {
        alert('名前は必ず入力して下さい')
        return
      }
      if (name.length > 10) {
        console.log(name.length)
        alert('名前は必ず10文字以下にして下さい')
        return
      }
      if (content.length > 50) {
        alert('内容は必ず50文字以下にして下さい')
        return
      }

      await createMutateAsync({ name, content })

      setName('')
      setContent('')

      await queryClient.invalidateQueries({ queryKey: todosKeys.all })
    } catch (error) {
      console.error('Todoの作成に失敗しました:', error)
    }
  }

  const handleTodoDeletion = async (id: number) => {
    try {
      await deleteMutateAsync({ id })

      await queryClient.invalidateQueries({ queryKey: todosKeys.all })
    } catch (error) {
      console.error('Todoの削除に失敗しました:', error)
    }
  }

  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>Error fetching data</div>
  if (data === undefined) return <div>data is undefined</div>

  console.log(data.meta)

  const todosInfo = data.data.items

  return (
    <div>
      <h1>Todo List</h1>
      <button onClick={handleTodoCreation}>作成</button>
      <label>
        名前:
        <input value={name} onChange={handleNameCreation} />
      </label>
      <label>
        内容:
        <input value={content} onChange={handleContentCreation} />
      </label>
      {data.data.items.map((todo: Todo) => (
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
      <TanStackTable todosInfo={todosInfo} />
    </div>
  )
}
