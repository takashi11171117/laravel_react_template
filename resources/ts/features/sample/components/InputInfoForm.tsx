import * as z from 'zod'
import tw, { css } from 'twin.macro'
import { Form, InputField } from '@/components/Form'
import { useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { useCreateTodo } from '@/features/sample/hooks/viewModel/todos/useCreateTodo'
import { todosKeys } from '@/features/sample/hooks/api/todos/todosKeys'

const schema = z.object({
  name: z
    .string()
    .min(1, 'やることの名称を入力してください')
    .max(10, '10文字以下で入力してください'),
  content: z
    .string()
    .max(50, '50文字以下で入力してください'),
})

type RegisterValues = {
  name: string
  content: string
}

type InputFormProps = {
  onSuccess: () => void
}

export const InputInfoForm = ({ onSuccess }: InputFormProps) => {
  
  const [errorMessage, setErrorMessage] = useState('')
  const { createMutateAsync } = useCreateTodo()
  const queryClient = useQueryClient()

  return (
    <div>
      <Form<RegisterValues, typeof schema>
        onSubmit={async values => {
          try {
            onSuccess()
            console.log(values);
            const {name, content} = values;
            await createMutateAsync({ name, content })
            await queryClient.invalidateQueries({ queryKey: todosKeys.all })
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
              type="text"
              label="やることの名称"
              error={formState.errors['name']}
              registration={register('name')}
            />
            <InputField
              type="text"
              label="やることの内容"
              error={formState.errors['content']}
              registration={register('content')}
            />
            <button type="submit">やることを記録</button>
          </div>
        )}
      </Form>
    </div>
  )
}