import { Suspense } from 'react'
import tw, { css } from 'twin.macro'
import { Navigate, Outlet } from 'react-router-dom'

import { Spinner } from '@/components/Elements'
import { MainLayout } from '@/components/Layout'

import { Dashboard } from '@/features/misc'
import { Page1 } from '@/features/sample'
import { Page2 } from '@/features/sample'
import { TodoDetail } from '@/features/sample'
import { TodoList } from '@/features/sample'
import { UserPagination } from '@/features/sample'
import { guardLoader } from '@/hooks/useAuth'

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
      /*
      { path: 'page1', element: <Page1 />, loader: guardLoader },
      { path: 'page2', element: <Page2 />, loader: guardLoader },
      { path: 'todos', element: <TodoList />, loader: guardLoader },
      { path: 'todos/:id', element: <TodoDetail />, loader: guardLoader },
      { path: 'users', element: <UserPagination />, loader: guardLoader },
      { path: '', element: <Dashboard />, loader: guardLoader },
      { path: '*', element: <Navigate to="." />, loader: guardLoader },
      */
      { path: 'page1', element: <Page1 /> },
      { path: 'page2', element: <Page2 /> },
      { path: 'todos', element: <TodoList /> },
      { path: 'todos/:id', element: <TodoDetail /> },
      { path: 'users', element: <UserPagination /> },
      { path: '', element: <Dashboard /> },
      { path: '*', element: <Navigate to="." /> },
    ],
  },
]
