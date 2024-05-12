import * as React from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { RouterProvider } from 'react-router-dom'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from '@/lib/reactQuery'
import { Button, Spinner } from '@/components/Elements'
import tw, { css } from 'twin.macro'
import { appRoutes } from '@/routes'
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const ErrorFallback = () => {
  return (
    <div css={errorFallback} role="alert">
      <h2 css={errorFallbackText}>Ooops, something went wrong</h2>
      <Button
        css={errorFallbackButton}
        onClick={() => window.location.assign(window.location.origin)}>
        Refresh
      </Button>
    </div>
  )
}

const errorFallback = css`
  ${tw`text-red-500 w-screen h-screen flex flex-col justify-center items-center`}
`

const errorFallbackText = css`
  ${tw`text-lg font-semibold`}
`

const errorFallbackButton = css`
  ${tw`mt-4`}
`

type AppProviderProps = {
  children: React.ReactNode
}

export const AppProvider = ({ children }: AppProviderProps) => {
  return (
    <React.Suspense
      fallback={
        <div css={spinner}>
          <Spinner size="xl" />
        </div>
      }>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <DndProvider backend={HTML5Backend}>
        <QueryClientProvider client={queryClient}>
          <ToastContainer
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            position={'bottom-right'}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
          <RouterProvider router={appRoutes()} />
        </QueryClientProvider>
        </DndProvider>
      </ErrorBoundary>
    </React.Suspense>
  )
}

const spinner = css`
  ${tw`flex items-center justify-center w-screen h-screen`}
`
