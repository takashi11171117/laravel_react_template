import React, { useEffect } from 'react'
import tw, { css } from 'twin.macro'
import { Home } from './pages/Home'
import { Page1 } from './pages/Page1'
import { Page2 } from './pages/Page2'
import { Routes, Route, Link } from 'react-router-dom'
import { LinkNavigation } from './LinkNavigation'

const App: React.FC = () => {
  useEffect(() => {}, [])
  return (
    <div css={style}>
      <LinkNavigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/page1" element={<Page1 />} />
        <Route path="/page2" element={<Page2 />} />
      </Routes>
    </div>
  )
}

export default App

const style = css`
  ${tw`mt-5`}
  color: black;
`
