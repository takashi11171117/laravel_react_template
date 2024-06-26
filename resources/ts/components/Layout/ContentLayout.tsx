import * as React from 'react'
import tw, { css } from 'twin.macro'

type ContentLayoutProps = {
  children: React.ReactNode
  title: string
}

export const ContentLayout = ({ children, title }: ContentLayoutProps) => {
  return (
    <>
      <div css={contentLayout}>
        <div css={contentLayout2}>
          <h1 css={contentLayout3}>{title}</h1>
        </div>
        <div css={contentLayout2}>{children}</div>
      </div>
    </>
  )
}

const contentLayout = css`
  ${tw`py-6`}
`

const contentLayout2 = css`
  ${tw`max-w-7xl mx-auto px-4 sm:px-6 md:px-8`}
`

const contentLayout3 = css`
  ${tw`text-2xl font-semibold text-gray-900`}
`
