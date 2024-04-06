import * as React from 'react'
import { FieldError } from 'react-hook-form'
import tw, { css } from 'twin.macro'

type FieldWrapperProps = {
  label?: string
  className?: string
  children: React.ReactNode
  error?: FieldError | undefined
  description?: string
}

export type FieldWrapperPassThroughProps = Omit<
  FieldWrapperProps,
  'className' | 'children'
>

export const FieldWrapper = (props: FieldWrapperProps) => {
  const { label, error, children } = props
  return (
    <div>
      <label css={labelStyle}>
        {label}
        <div className="mt-1">{children}</div>
      </label>
      {error?.message && (
        <div role="alert" aria-label={error.message} css={alert}>
          {error.message}
        </div>
      )}
    </div>
  )
}

const labelStyle = css`
  ${tw`font-medium text-blue-600 hover:text-blue-500`}
`

const alert = css`
  ${tw`text-sm font-semibold text-red-500`}
`
