import { redirect } from 'react-router-dom'
import { me } from '@/features/auth'

export const guardLoader = async () => {
  try {
    await me()
    return true
  } catch {
    return redirect('/auth/login')
  }
}

export const guestLoader = async () => {
  try {
    await me()
    return redirect('/app')
  } catch {
    return true
  }
}
