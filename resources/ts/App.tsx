import React, { useEffect } from 'react'
import tw, { css } from 'twin.macro'
import AppRouter from '@/AppRouter'
import { LinkNavigation } from '@/LinkNavigation'
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query';

const queryClient = new QueryClient();

const App: React.FC = () => {
  useEffect(() => {}, [])
  return (
    <div css={style}>
      <QueryClientProvider client={queryClient}>
        <LinkNavigation />
        <AppRouter />
      </QueryClientProvider>
    </div>
  )
}

export default App

const style = css`
  ${tw`mt-5`}
  color: black;
`
