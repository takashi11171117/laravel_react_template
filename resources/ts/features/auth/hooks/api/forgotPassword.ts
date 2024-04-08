import { axios } from '@/lib/axios'
import { MutationFunction } from '@tanstack/react-query'

export type ForgotPasswordDTO = {
  email: string
}

export const forgotPassword: MutationFunction<
  void,
  ForgotPasswordDTO
> = async ({ email }: ForgotPasswordDTO) => {
  await axios.get('/sanctum/csrf-cookie')

  return axios.post(`/forgot-password`, {
    email,
  })
}
