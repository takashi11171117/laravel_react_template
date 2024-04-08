import { axios } from '@/lib/axios'
import { MutationFunction } from '@tanstack/react-query'

export type RegisterUserDTO = {
  name: string
  email: string
  password: string
  password_confirmation: string
}

export const registerUser: MutationFunction<void, RegisterUserDTO> = async ({
  name,
  email,
  password,
  password_confirmation,
}: RegisterUserDTO) => {
  await axios.get('/sanctum/csrf-cookie')

  return axios.post(`/register`, {
    name,
    email,
    password,
    password_confirmation,
  })
}
