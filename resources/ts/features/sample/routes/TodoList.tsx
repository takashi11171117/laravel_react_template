import { useQueryClient } from '@tanstack/react-query'
import { useFetchTodosPaginated,useFetchTodosPaginatedSorted } from '@/features/sample/hooks/viewModel/todos/useFetchTodos'
import { TanStackTable } from '@/components/Elements/Table/TanStackTable'
import { InputInfoForm } from '@/features/sample/components/InputInfoForm'
import { TodoListItem } from '../components/TodoListItem'
import { useNavigate, useSearchParams } from 'react-router-dom';

export const TodoList = () => {
  
  const queryClient = useQueryClient()

  //const { data, isLoading, isError } = useFetchTodosPaginated(1,3)

  const { data, isLoading, isError } = useFetchTodosPaginatedSorted(1,3,'id', 'asc')

  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>Error fetching data</div>
  if (data === undefined) return <div>data is undefined</div>

  const todosTotal = data.meta.total

  const todosInfo = data.data.items

  console.log(data.data.items)

  return (
    <div>
      <h1>Todo List</h1>
      <InputInfoForm onSuccess={() => {}} />
      <TodoListItem todosInfo={todosInfo}/>
      <TanStackTable todosInfo={todosInfo} todosTotal={todosTotal} />
    </div>
  )
}
