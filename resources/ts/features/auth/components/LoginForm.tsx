import { Link } from 'react-router-dom'
import * as z from 'zod'
import tw, { css } from 'twin.macro'

import { Button } from '@/components/Elements'
import { Form, InputField } from '@/components/Form'
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
})

type LoginValues = {
  email: string
  password: string
}

type LoginFormProps = {
  onSuccess: () => void
}

export const LoginForm = ({ onSuccess }: LoginFormProps) => {
  const loginMutation = useLoginMutation()

  const [errorMessage, setErrorMessage] = useState('')

  return (
    <div>
      <Form<LoginValues, typeof schema>
        onSubmit={async values => {
          try {
            await loginMutation.mutateAsync(values)
            onSuccess()
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
              label="Email Address"
              error={formState.errors['email']}
              registration={register('email')}
            />
            <InputField
              type="password"
              label="Password"
              error={formState.errors['password']}
              registration={register('password')}
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
          <Link to="/auth/register" css={loginLink}>
            新規登録する
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
