import { Link } from 'react-router-dom'
import { useQueryClient } from '@tanstack/react-query'
import { useDeleteTodo } from '@/features/sample/hooks/viewModel/todos/useDeleteTodo'
import { todosKeys } from '@/features/sample/hooks/api/todos/todosKeys'
import { UpdateImageInfoForm } from '@/features/sample/components/UpdateImageInfoForm'
import { DeleteImageInfoButton } from '@/features/sample/components/DeleteImageInfoButton'


type Props = {
  imagesInfo: Image[]
  todoId: number
}

export const ImageListItem = ({ imagesInfo, todoId }: Props) => {

  const queryClient = useQueryClient()
  /*
  const { deleteMutateAsync } = useDeleteTodo()

  const handleTodoDeletion = async (id: number) => {
    try {
      await deleteMutateAsync({ id })

      await queryClient.invalidateQueries({ queryKey: todosKeys.all })
    } catch (error) {
      console.error('Todoの削除に失敗しました:', error)
    }
  }
  */

  return (
    <div>
      {imagesInfo.map((imageInfo: Image, index: number) => (
        <div key={index}>
          <img src={imageInfo.processedFilename} />
          <p>{imageInfo.id}</p>
          <p>{imageInfo.title}</p>
          <p>{imageInfo.rawFilename}</p>
          {/*
          <label htmlFor="image">画像*****</label>
          <input
            onChange={handleImageCreation}
            type="file"
            id="image"
            name="image"
            required
            accept="image/png, image/jpeg, image/jpg"
          />
          <TodoInputForUpdate
            updatedTitle={updatedTitle}
            updatedFilename={updatedFilename}
            title={imageInfo.title}
            filename={imageInfo.rawFilename}
            handleOnClick={handleUpdatedImageInfo}
            setUpdatedTitle={setUpdatedTitle}
            setUpdatedFilename={setUpdatedFilename}
          />
          <button
            onClick={() => handleImageForTodoUpdate(todo.id, imageInfo.id)}
            type="button">
            更新する
          </button>
      */}
          <UpdateImageInfoForm onSuccess={() => {}} todoId={todoId} imageId={imageInfo.id}/>

          <br />
          <DeleteImageInfoButton todoId={todoId} imageId={imageInfo.id}/>
          {/*
          <button
            onClick={() => {
              handleImageForTodoDeletion(todo.id, imageInfo.id)
              console.log(imageInfo.id)
            }}
            type="button">
            削除する_old
          </button>
          */}

        </div>
      ))}
    </div>
  )
}