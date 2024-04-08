import { axios } from '@/lib/axios'
import { MutationFunction } from '@tanstack/react-query'

export type ResetPasswordDTO = {
  email: string
  password: string
  password_confirmation: string
  token: string
}

export const resetPassword: MutationFunction<void, ResetPasswordDTO> = async ({
  email,
  password,
  password_confirmation,
  token,
}: ResetPasswordDTO) => {
  await axios.get('/sanctum/csrf-cookie')

  return axios.post(`/reset-password`, {
    email,
    password,
    password_confirmation,
    token,
  })
}
