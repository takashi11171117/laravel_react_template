import * as React from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { BrowserRouter as Router } from 'react-router-dom'
import { Sanctum } from 'react-sanctum'

import { Button, Spinner } from '@/components/Elements'

const ErrorFallback = () => {
  return (
    <div
      className="text-red-500 w-screen h-screen flex flex-col justify-center items-center"
      role="alert">
      <h2 className="text-lg font-semibold">Ooops, something went wrong :( </h2>
      <Button
        className="mt-4"
        onClick={() => window.location.assign(window.location.origin)}>
        Refresh
      </Button>
    </div>
  )
}

type AppProviderProps = {
  children: React.ReactNode
}

const sanctumConfig = {
  apiUrl: 'http://localhost:8001',
  csrfCookieRoute: 'sanctum/csrf-cookie',
  signInRoute: 'api/login',
  signOutRoute: 'api/logout',
  userObjectRoute: 'api/user',
}

export const AppProvider = ({ children }: AppProviderProps) => {
  return (
    <React.Suspense
      fallback={
        <div className="flex items-center justify-center w-screen h-screen">
          <Spinner size="xl" />
        </div>
      }>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Sanctum config={sanctumConfig}>
          <Router>{children}</Router>
        </Sanctum>
      </ErrorBoundary>
    </React.Suspense>
  )
}
