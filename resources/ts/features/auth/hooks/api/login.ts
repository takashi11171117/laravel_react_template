import { axios } from '@/lib/axios'
import { MutationFunction } from '@tanstack/react-query'

export type LoginDTO = {
  email: string
  password: string
}

export const login: MutationFunction<void, LoginDTO> = async ({
  email,
  password,
}: LoginDTO) => {
  await axios.get('/sanctum/csrf-cookie')

  return axios.post(`/login`, {
    email,
    password,
  })
}
