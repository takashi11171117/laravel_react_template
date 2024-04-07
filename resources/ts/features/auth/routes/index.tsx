import { Route, Routes } from 'react-router-dom'

import { Login } from './Login'
import { Register } from './Register'
import { ForgotPassword } from './ForgotPassword'
import { ResetPassword } from './ResetPassword'
import { guardLoader } from '@/hooks/useAuth'

export const AuthRoutes = () => {
  return (
    <Routes>
      <Route path="login" element={<Login />} loader={guardLoader} />
      <Route path="register" element={<Register />} loader={guardLoader} />
      <Route
        path="forgot-password"
        element={<ForgotPassword />}
        loader={guardLoader}
      />
      <Route
        path="reset-password/:token"
        element={<ResetPassword />}
        loader={guardLoader}
      />
    </Routes>
  )
}
