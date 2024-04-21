import { UseFormRegisterReturn } from 'react-hook-form'

import { FieldWrapper, FieldWrapperPassThroughProps } from './FieldWrapper'
import tw, { css } from 'twin.macro'


type InputFieldProps = FieldWrapperPassThroughProps & {
  type?: 'text' | 'email' | 'password' | 'file'
  registration: Partial<UseFormRegisterReturn>
}

export const InputField = (props: InputFieldProps) => {
  const { type = 'text', label, registration, error } = props
  return (
    <FieldWrapper label={label} error={error}>
      <input type={type} css={input} {...registration} />
    </FieldWrapper>
  )
}

const input = css`
  ${tw`appearance-none block px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
  width: calc(100% - 1.5rem);
`

