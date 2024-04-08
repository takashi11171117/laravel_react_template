import { useRegisterUserMutation } from '@/features/auth/hooks/api/hooks'

export const useRegisterUser = () => {
  const { mutateAsync } = useRegisterUserMutation()

  const registerMutateAsync = mutateAsync

  return { registerMutateAsync }
}
