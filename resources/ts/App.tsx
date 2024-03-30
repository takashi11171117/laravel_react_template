import { AppProvider } from '@/providers/app'
import { AppRoutes } from '@/routes'
import { GlobalStyles } from 'twin.macro'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnMount: true,
    },
  },
})

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppProvider>
        <GlobalStyles />
        <AppRoutes />
      </AppProvider>
    </QueryClientProvider>
  )
}

export default App
