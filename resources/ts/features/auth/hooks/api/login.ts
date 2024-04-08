import { axios } from '@/lib/axios'
import { MutationFunction } from '@tanstack/react-query'

export type LoginDTO = {
  email: string
  password: string
  remember: boolean
}

export const login: MutationFunction<void, LoginDTO> = async ({
  email,
  password,
  remember,
}: LoginDTO) => {
  await axios.get('/sanctum/csrf-cookie')

  return axios.post(`/login`, {
    email,
    password,
    remember,
  })
}
