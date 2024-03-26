import { Suspense } from 'react'
import tw, { css } from 'twin.macro'
import { Navigate, Outlet } from 'react-router-dom'

import { Spinner } from '@/components/Elements'
import { MainLayout } from '@/components/Layout'
import { lazyImport } from '@/utils/lazyImport'

const { Dashboard } = lazyImport(() => import('@/features/misc'), 'Dashboard')
const { Page1 } = lazyImport(() => import('@/features/sample'), 'Page1')
const { Page2 } = lazyImport(() => import('@/features/sample'), 'Page2')

const App = () => {
  return (
    <MainLayout>
      <Suspense
        fallback={
          <div css={suspense}>
            <Spinner size="xl" />
          </div>
        }>
        <Outlet />
      </Suspense>
    </MainLayout>
  )
}

const suspense = css`
  ${tw`h-full w-full flex items-center justify-center`}
`

export const protectedRoutes = [
  {
    path: '/app',
    element: <App />,
    children: [
      { path: 'page1', element: <Page1 /> },
      { path: 'page2', element: <Page2 /> },
      { path: '', element: <Dashboard /> },
      { path: '*', element: <Navigate to="." /> },
    ],
  },
]
