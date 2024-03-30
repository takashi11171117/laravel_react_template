import tw, { css } from 'twin.macro'

const sizes = {
  sm: tw`h-4 w-4`,
  md: tw`h-8 w-8`,
  lg: tw`h-16 w-16`,
  xl: tw`h-24 w-24`,
}

const variants = {
  light: tw`text-white`,
  primary: tw`text-blue-600`,
}

export type SpinnerProps = {
  size?: keyof typeof sizes
  variant?: keyof typeof variants
}

export const Spinner = ({ size = 'md', variant = 'primary' }: SpinnerProps) => {
  return (
    <>
      <svg
        css={spinner({ size, variant })}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        data-testid="loading">
        <circle
          css={spinnerCircle}
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"></circle>
        <path
          css={spinnerPath}
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
      <span className="sr-only">Loading</span>
    </>
  )
}

const spinner = ({ size = 'md', variant = 'primary' }: SpinnerProps) => css`
  ${tw`animate-spin`}
  ${sizes[size]}
  ${variants[variant]}
`

const spinnerCircle = css`
  ${tw`opacity-25`}
`

const spinnerPath = css`
  ${tw`opacity-75`}
`
