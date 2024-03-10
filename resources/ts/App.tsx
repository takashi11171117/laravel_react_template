import React, { useEffect } from 'react'
import AppRouter from '@/AppRouter'
import { LinkNavigation } from '@/LinkNavigation'
import { ThemeProvider } from '@mui/material/styles'
import { theme } from '@/components/theme'

const App: React.FC = () => {
  useEffect(() => {}, [])
  return (
    <ThemeProvider theme={theme}>
      <LinkNavigation />
      <AppRouter />
    </ThemeProvider>
  )
}

export default App
