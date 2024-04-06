import { useNavigate } from 'react-router-dom'

import { Layout } from '@/features/auth/components/Layout'
import { LoginForm } from '@/features/auth/components/LoginForm'

export const Login = () => {
  const navigate = useNavigate()

  return (
    <Layout title="Log in to your account">
      <LoginForm onSuccess={() => navigate('/app')} />
    </Layout>
  )
}
