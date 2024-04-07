import { useNavigate } from 'react-router-dom'

import { Layout } from '@/features/auth/components/Layout'
import { RegisterForm } from '@/features/auth/components/RegisterForm'

export const Register = () => {
  const navigate = useNavigate()

  return (
    <Layout title="新規登録">
      <RegisterForm onSuccess={() => navigate('/auth/login')} />
    </Layout>
  )
}
