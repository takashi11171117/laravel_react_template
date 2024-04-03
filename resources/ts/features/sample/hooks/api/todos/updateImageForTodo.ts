import { axios } from '@/lib/axios'
import { MutationFunction } from '@tanstack/react-query'

export type UpdateImageForTodoDTO = {
  updatedTitle: string
  updatedFilename: string
  image: File | null
  todoId: number
  imageId: number
}

export const updateImageForTodo: MutationFunction<
  void,
  UpdateImageForTodoDTO
> = async ({
  updatedTitle,
  updatedFilename,
  image,
  todoId,
  imageId,
}: UpdateImageForTodoDTO) => {
  const config = {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  }

  const formData = new FormData()

  if (image !== null) {
    formData.append('image', image)
    formData.append('title', updatedTitle)
    formData.append('filename', updatedFilename)

    return axios
      .post(`/todos/${todoId}/${imageId}`, formData, config)
      .then(response => {
        console.log(response)
      })
      .catch(error => {
        console.log(error)
        alert(error.name.required)
      })
  } else {
    return axios
      .post(`/todos/${todoId}/${imageId}`, {
        title: updatedTitle,
        filename: updatedFilename,
      })
      .then(response => {
        console.log(response)
      })
      .catch(error => {
        console.log(error)
        alert(error.name.required)
      })
  }
}
