import { Link as RouterLink, LinkProps } from 'react-router-dom'
import tw, { css } from 'twin.macro'

export const Link = ({ className, children, ...props }: LinkProps) => {
  const { css, ...routerLinkProps } = props
  return (
    <RouterLink css={link} {...routerLinkProps}>
      {children}
    </RouterLink>
  )
}

const link = css`
  ${tw`text-indigo-600 hover:text-indigo-900`}
`
