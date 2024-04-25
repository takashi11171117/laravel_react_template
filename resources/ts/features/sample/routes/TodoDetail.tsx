import { useLocation } from 'react-router-dom'
import { useQueryClient } from '@tanstack/react-query'
import { useFetchTodo } from '@/features/sample/hooks/viewModel/todos/useFetchTodo'
import { useStorePDFForTodo } from '@/features/sample/hooks/viewModel/todos/useStorePDFForTodoMutation'
import { todosKeys } from '@/features/sample/hooks/api/todos/todosKeys'
import { UpdateInfoForm } from '@/features/sample/components/UpdateInfoForm'
import { InputImageInfoForm } from '@/features/sample/components/InputImageInfoForm' 
import { ImageListItem } from '@/features/sample/components/ImageListItem'
import { DragDropContainer } from '@/components/Form/DragDropInput/DragDropContainer'

export const TodoDetail = () => {

  const location = useLocation()

  const todoId = location.state.todoId as number

  const queryClient = useQueryClient()

  const { todo, isLoading, isError } = useFetchTodo(todoId)

  const { storePDFForTodoMutateAsync } = useStorePDFForTodo()

  const handlePDFForTodoStorage = async (todo: Todo) => {
    try {
      const todoContent = todo.content
      const todoId = todo.id

      await storePDFForTodoMutateAsync({ todoContent, todoId })

      await queryClient.invalidateQueries({ queryKey: todosKeys.each })
    } catch (error) {
      console.error('pdfの作成に失敗しました:', error)
    }
  }

  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>Error fetching data</div>
  if (todo === undefined) return <div>data is undefined</div> //console.log(data);

  const filenames = todo.image_filenames

  const imageIds = todo.image_ids

  const imageTitles = todo.image_titles

  const processedFilenames = filenames.map(
    (filename: string, index: number) => {
      return `/storage/images/${filename}`
    },
  )

  const imageInfos: Image[] = imageIds.map((id: number, index: number) => {
    return {
      id: id,
      title: imageTitles[index],
      rawFilename: filenames[index],
      processedFilename: processedFilenames[index],
    }
  })

  return (
    <div>
      <h1>TodoDetail is here.</h1>
      <p>名前: {todo.name}</p>
      <p>内容: {todo.content}</p>

      <UpdateInfoForm onSuccess={() => {}} todoId={todo.id}/>
      <InputImageInfoForm onSuccess={() => {}} todoId={todo.id} />
      <br />
      <br />
      <DragDropContainer todoId={todo.id}/>
      <br/>
      <div>
        <button onClick={() => handlePDFForTodoStorage(todo)}>PDF作成</button>
      </div>
      <br />
      
      <ImageListItem imagesInfo={imageInfos} todoId={todo.id}/>

    </div>
  )
}
