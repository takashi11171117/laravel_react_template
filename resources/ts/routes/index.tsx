import { createBrowserRouter, useRoutes } from 'react-router-dom'

import { Landing } from '@/features/misc'

import { protectedRoutes } from '@/routes/protected'
import { publicRoutes } from './public'

export const appRoutes = () => {
  const commonRoutes = [{ index: true, element: <Landing /> }]

  const router = createBrowserRouter([
    ...protectedRoutes,
    ...publicRoutes,
    ...commonRoutes,
  ])

  return router
}
