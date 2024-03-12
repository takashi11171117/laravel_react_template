import { AppProvider } from '@/providers/app'
import { AppRoutes } from '@/routes'
import { GlobalStyles } from 'twin.macro'

function App() {
  return (
    <AppProvider>
      <GlobalStyles />
      <AppRoutes />
    </AppProvider>
  )
}

export default App
