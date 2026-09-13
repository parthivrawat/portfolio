import { StrictMode, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { initSentry, ErrorBoundary } from './utils/error-handler'
import App from './App'
import './styles/globals.css'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
})

initSentry()

const ErrorFallback = ({
  error,
  resetError,
}: {
  error: Error
  resetError: () => void
}) => (
  <div className="min-h-screen flex items-center justify-center p-4 bg-white dark:bg-gray-950">
    <div className="max-w-prose">
      <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
        Something went wrong
      </h2>
      <p className="text-gray-700 dark:text-gray-300 mb-6">
        We apologize, but an unexpected error occurred.
      </p>
      {import.meta.env.DEV && (
        <p className="text-sm text-red-600 dark:text-red-400 mb-6 font-mono">
          {error.message}
        </p>
      )}
      <button
        onClick={resetError}
        className="text-primary-600 dark:text-primary-400 hover:underline"
      >
        Try again
      </button>
    </div>
  </div>
)

const AppContainer = () => (
  <StrictMode>
    <ErrorBoundary fallback={ErrorFallback}>
      <Suspense fallback={<div className="min-h-screen" />}>
        <QueryClientProvider client={queryClient}>
          <HelmetProvider>
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </HelmetProvider>
          {import.meta.env.DEV && <ReactQueryDevtools initialIsOpen={false} />}
        </QueryClientProvider>
      </Suspense>
    </ErrorBoundary>
  </StrictMode>
)

const container = document.getElementById('root')
if (container) {
  const root = createRoot(container)
  root.render(<AppContainer />)
}
