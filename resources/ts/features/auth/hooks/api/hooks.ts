import { queryClient } from '@/lib/reactQuery'
import { me } from './me'
import { authKeys } from './authKeys'

const meQuery = () => ({
  queryKey: authKeys.me,
  queryFn: me,
})
export const useMeQuery = async () => {
  const query = meQuery()

  return (
    queryClient.getQueryData(query.queryKey) ??
    (await queryClient.fetchQuery(query).catch(() => undefined))
  )
}
