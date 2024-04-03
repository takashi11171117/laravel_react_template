import { axios } from '@/lib/axios'
import { MutationFunction } from '@tanstack/react-query'

export type DeleteImageForTodDTO = {
  todoId: number
  imageId: number
}

export const deleteImageForTodo: MutationFunction<
  void,
  DeleteImageForTodDTO
> = async ({ todoId, imageId }: DeleteImageForTodDTO) => {
  const config = {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  }

  return axios
    .delete(`/todos/${todoId}/${imageId}`)
    .then(response => {
      console.log(response)
    })
    .catch(error => {
      console.log(error)
      alert(error.name.required)
    })
}
