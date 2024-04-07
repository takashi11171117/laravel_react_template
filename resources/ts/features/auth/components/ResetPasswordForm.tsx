import { Link, useParams, useSearchParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import * as z from 'zod'

import { Button } from '@/components/Elements'
import { Form, InputField } from '@/components/Form'
import tw, { css } from 'twin.macro'
import { useResetPasswordMutation } from '@/features/auth/hooks/api/hooks'
import { useState } from 'react'

const schema = z
  .object({
    email: z.string(),
    password: z
      .string()
      .min(10, '10文字以上で入力してください')
      .max(64, '64文字以下で入力してください')
      .regex(
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()[\]\-=_+{};':"\\|,.<>?/~`])/,
        { message: '大文字小文字の半角英、数字、記号を使用してください' },
      ),
    password_confirmation: z
      .string()
      .min(1, '確認用のパスワードを入力してください'),
    token: z.string(),
  })
  .superRefine(({ password, password_confirmation }, ctx) => {
    if (password !== password_confirmation) {
      ctx.addIssue({
        path: ['password_confirmation'],
        code: 'custom',
        message: 'パスワードが一致しません',
      })
    }
  })

type RegisterValues = {
  email: string
  password: string
  password_confirmation: string
  token: string
}

type ResetPasswordFormProps = {
  onSuccess: () => void
}

export const ResetPasswordForm = ({ onSuccess }: ResetPasswordFormProps) => {
  const resetPasswordMutation = useResetPasswordMutation()
  const { token } = useParams()
  const [searchParams] = useSearchParams()

  const [errorMessage, setErrorMessage] = useState('')

  return (
    <div>
      <h2>パスワード再設定</h2>
      <p>ご利用中のメールアドレスを入力してください</p>
      <p>パスワード再設定のためのURLをお送りします</p>
      <Form<RegisterValues, typeof schema>
        onSubmit={async values => {
          try {
            await resetPasswordMutation.mutateAsync(values)
            toast.success('パスワード再設定が完了しました。')
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
              type="password"
              label="パスワード"
              error={formState.errors['password']}
              registration={register('password')}
            />
            <InputField
              type="password"
              label="パスワード確認"
              error={formState.errors['password_confirmation']}
              registration={register('password_confirmation')}
            />
            <input
              type="hidden"
              value={searchParams.get('email')!}
              {...register('email')}
            />
            <input type="hidden" value={token} {...register('token')} />

            <div>
              {resetPasswordMutation.isError ? (
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
                isLoading={resetPasswordMutation.isPending}
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
