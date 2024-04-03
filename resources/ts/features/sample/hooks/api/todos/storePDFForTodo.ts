import { axios } from '@/lib/axios'
import { MutationFunction } from '@tanstack/react-query'

export type StorePDFForTodoDTO = {
  todoContent: string
  todoId: number
}

export const storePDFForTodo: MutationFunction<
  void,
  StorePDFForTodoDTO
> = async ({ todoContent, todoId }: StorePDFForTodoDTO) => {
  const pdfFilename = `${todoContent}.pdf`

  return axios
    .post(`/todos/${todoId}/pdf`, { filename: pdfFilename })
    .then(response => {
      console.log(response)
    })
    .catch(error => {
      console.log(error)
      console.log(error.response.data)
      alert(error.response.data.message)
    })
}
