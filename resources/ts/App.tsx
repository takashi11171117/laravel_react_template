import React, { useEffect } from 'react'
import AppRouter from '@/AppRouter'
import { Sanctum } from 'react-sanctum'
import { LinkNavigation } from '@/LinkNavigation'
import { ThemeProvider } from '@mui/material/styles'
import { theme } from '@/components/theme'

const sanctumConfig = {
  apiUrl: 'http://localhost:8001',
  csrfCookieRoute: 'sanctum/csrf-cookie',
  signInRoute: 'api/login',
  signOutRoute: 'api/logout',
  userObjectRoute: 'api/user',
}

const App: React.FC = () => {
  useEffect(() => {}, [])
  return (
    <ThemeProvider theme={theme}>
      <Sanctum config={sanctumConfig}>
        <LinkNavigation />
        <AppRouter />
      </Sanctum>
    </ThemeProvider>
  )
}

export default App
