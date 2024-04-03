import { axios } from '@/lib/axios'
import { MutationFunction } from '@tanstack/react-query'

export type DeleteTodoDTO = {
  id: number
}

export const deleteTodo: MutationFunction<void, DeleteTodoDTO> = async ({
  id,
}: DeleteTodoDTO) => {
  return axios
    .delete(`/todos/${id}`)
    .then(response => {
      console.log(response)
    })
    .catch(error => console.log(error))
}
