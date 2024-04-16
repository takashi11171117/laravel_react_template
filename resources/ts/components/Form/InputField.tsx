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
      <input type={type} {...registration} />
    </FieldWrapper>
  )
}

