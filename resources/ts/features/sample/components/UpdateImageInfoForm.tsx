import * as z from 'zod'
import tw, { css } from 'twin.macro'
import { Form, InputField } from '@/components/Form'
import { useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { useUpdateImageForTodo } from '@/features/sample/hooks/viewModel/todos/useUpdateImageForTodo'
import { todosKeys } from '@/features/sample/hooks/api/todos/todosKeys'

const IMAGE_TYPES = ['image/png', 'image/jpeg', 'image/jpg'];

const schema = z.object({
  updatedTitle: z
    .string()
    .min(1, '画像の名称を入力してください')
    .max(10, '10文字以下で入力してください'),
  updatedFilename: z
    .string()
    .min(1, '画像のファイル名を入力してください')
    .max(50, '50文字以下で入力してください')
    .regex(
      (/\.(jpg|jpeg|png)$/i),
      { message: '有効なファイル形式は .jpg, .jpeg, .png です。' },),
  imageList: z
    .custom<FileList>()
    .refine((imageList) => imageList?.[0]?.size > 0, { message: '画像ファイルを必ず選んでください' })
    .refine((imageList) => IMAGE_TYPES.includes(imageList?.[0]?.type), {
      message: '.jpegもしくは.jpgもしくは.pngのみ可能です',
    })
    .refine((imageList) => imageList?.[0]?.size < 5000000, { message: 'ファイルサイズは最大5MBです' }),
})

type RegisterValues = {
  updatedTitle: string
  updatedFilename: string
  imageList: FileList
}

type InputFormProps = {
  onSuccess: () => void
  todoId: number
  imageId: number
}

export const UpdateImageInfoForm = ({ onSuccess, todoId, imageId }: InputFormProps) => {
  
  const [errorMessage, setErrorMessage] = useState('')
  const { updateImageForTodoMutateAsync } = useUpdateImageForTodo()
  const queryClient = useQueryClient()

  return (
    <div>
      <Form<RegisterValues, typeof schema>
        onSubmit={async values => {
          try {
            const {updatedTitle, updatedFilename, imageList} = values;
            console.log(imageList[0].name);
            console.log(updatedTitle);
            console.log(updatedFilename);
            console.log(imageList[0].size);
            const image = imageList[0];
            onSuccess()

            await updateImageForTodoMutateAsync({ updatedTitle, updatedFilename,image,todoId,imageId,})
            
            await queryClient.invalidateQueries({ queryKey: todosKeys.each })
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
              type='text'
              label='更新後の画像の名称'
              error={formState.errors['updatedTitle']}
              registration={register('updatedTitle')}
            />
            <InputField
              type='text'
              label='更新後のファイル名'
              error={formState.errors['updatedFilename']}
              registration={register('updatedFilename')}
            />
            <InputField
              type='file'
              label='更新したい画像を選ぶ'
              error={formState.errors['imageList']}
              registration={register('imageList')}
            />
            <button type="submit">画像データを記録</button>
          </div>
        )}
      </Form>
    </div>
  )
}