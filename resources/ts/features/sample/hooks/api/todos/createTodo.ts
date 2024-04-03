import { axios } from '@/lib/axios'
import { MutationFunction } from '@tanstack/react-query'

export type CreateTodoDTO = {
  name: string
  content: string
}

export const createTodo: MutationFunction<void, CreateTodoDTO> = async ({
  name,
  content,
}: CreateTodoDTO) => {
  return axios
    .post('/todos', {
      name: name,
      content: content,
    })
    .then(response => {
      console.log(response)
    })
    .catch(error => {
      console.log(error)
    })
}
