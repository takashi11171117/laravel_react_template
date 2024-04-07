import tw, { css } from 'twin.macro'
import { UseFormRegisterReturn } from 'react-hook-form'

type CheckboxProps = {
  label: string
  registration: Partial<UseFormRegisterReturn>
}

export const Checkbox = (props: CheckboxProps) => {
  const { label, registration } = props
  return (
    <div css={checkbox}>
      <input type="checkbox" value="" css={checkboxInput} {...registration} />
      <label css={checkboxLabel}>{label}</label>
    </div>
  )
}

const checkbox = css`
  ${tw`flex items-center`}
`
const checkboxInput = css`
  ${tw`w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500`}
`
const checkboxLabel = css`
  ${tw`ml-1 text-sm font-medium text-gray-900`}
`
