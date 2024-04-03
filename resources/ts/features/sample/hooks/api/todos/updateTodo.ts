import { axios } from '@/lib/axios'
import { MutationFunction } from '@tanstack/react-query'

export type UpdateTodoDTO = { name: string; content: string; todoId: number }

export const updateTodo: MutationFunction<void, UpdateTodoDTO> = async ({
  name,
  content,
  todoId,
}: UpdateTodoDTO) => {
  return axios
    .put(`/todos/${todoId}`, {
      name: name,
      content: content,
    })
    .then(response => {
      console.log(response)
    })
    .catch(error => {
      console.log(error)
      alert(error.name.required)
    })
}
