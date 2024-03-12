import { useRoutes } from 'react-router-dom'

import { Landing } from '@/features/misc'

import { protectedRoutes } from '@/routes/protected'

export const AppRoutes = () => {
  const commonRoutes = [{ index: true, element: <Landing /> }]

  const routes = protectedRoutes

  const element = useRoutes([...routes, ...commonRoutes])

  return <>{element}</>
}
