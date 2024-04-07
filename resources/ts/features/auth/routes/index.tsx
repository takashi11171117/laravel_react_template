import { Route, Routes } from 'react-router-dom'

import { Login } from './Login'
import { Register } from './Register'
import { guardLoader } from '@/hooks/useAuth'

export const AuthRoutes = () => {
  return (
    <Routes>
      <Route path="login" element={<Login />} loader={guardLoader} />
      <Route path="register" element={<Register />} loader={guardLoader} />
    </Routes>
  )
}
