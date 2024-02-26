import React, { useEffect } from 'react'
import tw, { css } from 'twin.macro'

const App: React.FC = () => {
  useEffect(() => {}, [])
  return <div css={style}>いいいいい</div>
}

export default App

const style = css`
  ${tw`mt-5`}
  color: black;
`
