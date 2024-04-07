import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import * as z from 'zod'
import tw, { css } from 'twin.macro'

import { Button } from '@/components/Elements'
import { Checkbox, Form, InputField } from '@/components/Form'
import { useLoginMutation } from '@/features/auth/hooks/api/hooks'
import { useState } from 'react'

const schema = z.object({
  email: z
    .string()
    .min(1, 'メールアドレスを入力してください')
    .email({ message: 'メールの形式が違います' }),
  password: z
    .string()
    .min(10, '10文字以上で入力してください')
    .max(64, '64文字以下で入力してください')
    .regex(
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()[\]\-=_+{};':"\\|,.<>?/~`])/,
      { message: '大文字小文字の半角英、数字、記号を使用してください' },
    ),
  remember: z.boolean(),
})

type RegisterValues = {
  email: string
  password: string
  remember: boolean
}

type LoginFormProps = {
  onSuccess: () => void
}

export const LoginForm = ({ onSuccess }: LoginFormProps) => {
  const loginMutation = useLoginMutation()

  const [errorMessage, setErrorMessage] = useState('')

  return (
    <div>
      <Form<RegisterValues, typeof schema>
        onSubmit={async values => {
          try {
            await loginMutation.mutateAsync(values)
            onSuccess()
            toast.success('ログインが完了しました。')
          } catch (error: any) {
            setErrorMessage(error.response.data.message)
          }
        }}
        schema={schema}>
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
            <InputField
              type="password"
              label="パスワード"
              error={formState.errors['password']}
              registration={register('password')}
            />
            <Checkbox
              label="次回から自動ログインする"
              registration={register('remember')}
            />
            <div>
              {loginMutation.isError ? (
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
                isLoading={loginMutation.isPending}
                type="submit"
                className="w-full">
                ログイン
              </Button>
            </div>
          </div>
        )}
      </Form>
      <div css={login}>
        <div css={login2}>
          <Link to="/auth/forgot-password" css={loginLink}>
            パスワードをお忘れの方
          </Link>
        </div>
      </div>
      <div css={password}>
        <div css={password2}>
          <Link to="/auth/register" css={loginLink}>
            新規登録する
          </Link>
        </div>
      </div>
    </div>
  )
}

const password = css`
  ${tw`mt-2 flex items-center justify-end`}
`

const password2 = css`
  ${tw`text-sm`}
`

const login = css`
  ${tw`mt-2 flex items-center justify-end`}
`

const login2 = css`
  ${tw`text-sm`}
`

const loginLink = css`
  ${tw`font-medium text-blue-600 hover:text-blue-500`}
`
