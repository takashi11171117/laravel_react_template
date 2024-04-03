import { axios } from '@/lib/axios'
import { MutationFunction } from '@tanstack/react-query'

export type StoreImageForTodoDTO = {
  title: string
  filename: string
  image: File | null
  todoId: number
}

export const storeImageForTodo: MutationFunction<
  void,
  StoreImageForTodoDTO
> = async ({ title, filename, image, todoId }: StoreImageForTodoDTO) => {
  const formData = new FormData()
  if (image !== null) {
    formData.append('image', image)
    formData.append('title', title)
    formData.append('filename', filename)
  }

  return axios
    .post(`/todos/${todoId}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then(response => {
      console.log(response)
    })
    .catch(error => {
      console.log(error)
      console.log(error.response.data)
      alert(error.response.data.message)
    })
}
