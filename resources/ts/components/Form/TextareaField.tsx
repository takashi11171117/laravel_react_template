import { UseFormRegisterReturn } from 'react-hook-form'
import tw, { css } from 'twin.macro'

import { FieldWrapper, FieldWrapperPassThroughProps } from './FieldWrapper'

type TextAreaFieldProps = FieldWrapperPassThroughProps & {
  className?: string
  registration: Partial<UseFormRegisterReturn>
}

export const TextAreaField = (props: TextAreaFieldProps) => {
  const { label, registration, error } = props
  return (
    <FieldWrapper label={label} error={error}>
      <textarea css={textarea} {...registration} />
    </FieldWrapper>
  )
}

const textarea = css`
  ${tw`mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-600 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md`}
`
