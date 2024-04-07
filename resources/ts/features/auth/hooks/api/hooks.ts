import {
  ExtractFnReturnType,
  MutationConfig,
  QueryConfig,
  queryClient,
} from '@/lib/reactQuery'
import { me } from './me'
import { registerUser } from './registerUser'
import { login } from './login'
import { authKeys } from './authKeys'
import { QueryClient, useMutation, useQuery } from '@tanstack/react-query'

type MeFnType = typeof me
type MeOptions = {
  config?: QueryConfig<MeFnType>
}
export const useMeQuery = ({
  options,
  queryClient,
}: {
  options?: MeOptions
  queryClient?: QueryClient
}) => {
  return useQuery<ExtractFnReturnType<MeFnType>>(
    {
      queryKey: authKeys.me,
      queryFn: async () => me(),
      ...options,
    },
    queryClient,
  )
}

type RegisterUserOptions = {
  config?: MutationConfig<typeof registerUser>
}
export const useRegisterUserMutation = (options?: RegisterUserOptions) => {
  return useMutation({
    mutationFn: registerUser,
    mutationKey: authKeys.me,
    ...options,
  })
}

type LoginOptions = {
  config?: MutationConfig<typeof login>
}
export const useLoginMutation = (options?: LoginOptions) => {
  return useMutation({
    mutationFn: login,
    mutationKey: authKeys.me,
    ...options,
  })
}
