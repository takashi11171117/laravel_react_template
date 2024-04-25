import { useQueryClient } from '@tanstack/react-query'
import { useFetchTodos } from '@/features/sample/hooks/viewModel/todos/useFetchTodos'
import { TanStackTable } from '@/components/Elements/Table/TanStackTable'
import { InputInfoForm } from '@/features/sample/components/InputInfoForm'
import { TodoListItem } from '../components/TodoListItem'

export const TodoList = () => {
  
  const queryClient = useQueryClient()

  const { data, isLoading, isError } = useFetchTodos()

  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>Error fetching data</div>
  if (data === undefined) return <div>data is undefined</div>

  console.log(data.meta)

  const todosInfo = data.data.items

  return (
    <div>
      <h1>Todo List</h1>
      <InputInfoForm onSuccess={() => {}} />
      <TodoListItem todosInfo={todosInfo}/>
      <TanStackTable todosInfo={todosInfo} />
    </div>
  )
}
