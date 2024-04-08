import { useNavigate } from 'react-router-dom'

import { Layout } from '@/features/auth/components/Layout'
import { ForgotPasswordForm } from '@/features/auth/components/ForgotPasswordForm'

export const ForgotPassword = () => {
  const navigate = useNavigate()

  return (
    <Layout title="パスワード再発行">
      <ForgotPasswordForm onSuccess={() => navigate('/auth/login')} />
    </Layout>
  )
}
