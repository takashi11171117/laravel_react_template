import { Link } from 'react-router-dom'
import * as z from 'zod'

import { Button } from '@/components/Elements'
import { Form, InputField } from '@/components/Form'
import tw, { css } from 'twin.macro'
import { useForgotPasswordMutation } from '@/features/auth/hooks/api/hooks'
import { useState } from 'react'

const schema = z.object({
  email: z
    .string()
    .min(1, 'メールアドレスを入力してください')
    .email({ message: 'メールの形式が違います' }),
})

type RegisterValues = {
  email: string
}

type ForgotPasswordFormProps = {
  onSuccess: () => void
}

export const ForgotPasswordForm = ({ onSuccess }: ForgotPasswordFormProps) => {
  const forgotPasswordMutation = useForgotPasswordMutation()

  const [errorMessage, setErrorMessage] = useState('')

  return (
    <div>
      <h2>パスワード再設定</h2>
      <p>ご利用中のメールアドレスを入力してください</p>
      <p>パスワード再設定のためのURLをお送りします</p>
      <Form<RegisterValues, typeof schema>
        onSubmit={async values => {
          try {
            await forgotPasswordMutation.mutateAsync(values)
            onSuccess()
          } catch (error: any) {
            setErrorMessage(error.response.data.message)
          }
        }}
        schema={schema}
        options={{
          shouldUnregister: true,
        }}>
        {({ register, formState }) => (
          <div
            css={css`
              ${tw`flex flex-col space-y-5`}
            `}>
            <InputField
              type="email"
              label="メールアドレス"
              error={formState.errors['email']}
              registration={register('email')}
            />

            <div>
              {forgotPasswordMutation.isError ? (
                <div
                  css={css`
                    ${tw`mb-3 text-red-700`}
                  `}>
                  {errorMessage}
                </div>
              ) : (
                <></>
              )}
              <Button
                isLoading={forgotPasswordMutation.isPending}
                type="submit"
                className="w-full">
                再設定メールを送信
              </Button>
            </div>
          </div>
        )}
      </Form>

      <div css={login}>
        <div css={login2}>
          <Link to="/auth/login" css={loginLink}>
            ログイン
          </Link>
        </div>
      </div>
    </div>
  )
}

const login = css`
  ${tw`mt-2 flex items-center justify-end`}
`

const login2 = css`
  ${tw`text-sm`}
`

const loginLink = css`
  ${tw`font-medium text-blue-600 hover:text-blue-500`}
`
