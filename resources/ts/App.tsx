import { GlobalStyles } from 'twin.macro'
import { AppProvider } from '@/providers/app'

function App() {
  return (
    <AppProvider>
      <GlobalStyles />
    </AppProvider>
  )
}

export default App
