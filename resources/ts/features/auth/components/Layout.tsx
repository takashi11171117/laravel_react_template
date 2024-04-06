import * as React from 'react'
import tw, { css } from 'twin.macro'

type LayoutProps = {
  children: React.ReactNode
  title: string
}

export const Layout = ({ children, title }: LayoutProps) => {
  return (
    <>
      <div css={layout}>
        <div css={layout2}>
          <h2 css={layoutH2}>{title}</h2>
        </div>

        <div css={layout3}>
          <div css={layout4}>{children}</div>
        </div>
      </div>
    </>
  )
}

const layout = css`
  ${tw`bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8`}
  min-height: calc(100vh - 6rem)
`

const layout2 = css`
  ${tw`sm:mx-auto sm:w-full sm:max-w-md`}
`

const layoutH2 = css`
  ${tw`mt-3 text-center text-3xl font-extrabold text-gray-900`}
`

const layout3 = css`
  ${tw`mt-8 sm:mx-auto sm:w-full sm:max-w-md`}
`

const layout4 = css`
  ${tw`bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10`}
`
