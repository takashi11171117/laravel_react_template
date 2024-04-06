import { redirect } from 'react-router-dom'
import { useMeQuery } from '@/features/auth/hooks/api/hooks'

export const guardLoader = async () => {
  const user = await useMeQuery()
  return user ? true : redirect('/auth/login')
}

export const guestLoader = async () => {
  const user = await useMeQuery()
  return user ? redirect('/app') : true
}
