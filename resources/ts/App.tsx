import React, { useEffect } from 'react'
import tw, { css } from 'twin.macro'
import AppRouter from '@/AppRouter'
import { LinkNavigation } from '@/LinkNavigation'

const App: React.FC = () => {
  useEffect(() => {}, [])
  return (
    <div css={style}>
      <LinkNavigation />
      <AppRouter />
    </div>
  )
}

export default App

const style = css`
  ${tw`mt-5`}
  color: black;
`
