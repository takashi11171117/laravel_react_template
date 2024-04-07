import { useNavigate } from 'react-router-dom'

import { Layout } from '@/features/auth/components/Layout'
import { ResetPasswordForm } from '@/features/auth/components/ResetPasswordForm'

export const ResetPassword = () => {
  const navigate = useNavigate()

  return (
    <Layout title="パスワード再設定">
      <ResetPasswordForm onSuccess={() => navigate('/auth/login')} />
    </Layout>
  )
}
