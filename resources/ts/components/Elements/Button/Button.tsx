import tw, { css } from 'twin.macro'
import * as React from 'react'

import { Spinner } from '@/components/Elements/Spinner'

const variants = {
  primary: tw`bg-blue-600 text-white`,
  inverse: tw`bg-white text-blue-600`,
  danger: tw`bg-red-600 text-white`,
}

const sizes = {
  sm: tw`py-2 px-4 text-sm`,
  md: tw`py-2 px-6`,
  lg: tw`py-3 px-8 text-lg`,
}

type IconProps =
  | { startIcon: React.ReactElement; endIcon?: never }
  | { endIcon: React.ReactElement; startIcon?: never }
  | { endIcon?: undefined; startIcon?: undefined }

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: keyof typeof variants
  size?: keyof typeof sizes
  isLoading?: boolean
} & IconProps

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      type = 'button',
      variant = 'primary',
      size = 'md',
      isLoading = false,
      startIcon,
      endIcon,
      css,
      ...props
    },
    ref,
  ) => {
    return (
      <button
        ref={ref}
        type={type}
        css={buttonStyle({ size, variant })}
        {...props}>
        {isLoading && <Spinner size="sm" />}
        {!isLoading && startIcon}
        <span css={buttonStyleSpan}>{props.children}</span>{' '}
        {!isLoading && endIcon}
      </button>
    )
  },
)

const buttonStyle = ({
  size = 'md',
  variant = 'primary',
}: Omit<ButtonProps, 'isLoading'>) => css`
  ${tw`flex justify-center items-center border border-gray-300 disabled:opacity-70 disabled:cursor-not-allowed rounded-md shadow-sm font-medium focus:outline-none hover:opacity-80`}
  ${variants[variant]}
  ${sizes[size]}
`

const buttonStyleSpan = css`
  ${tw`mx-2`}
`

Button.displayName = 'Button'
