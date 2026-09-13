import React, { Component, ComponentType, ReactNode, ReactElement } from 'react'
import * as Sentry from '@sentry/react'

type FallbackProps = {
  error: Error
  componentStack: string | null
  resetError: () => void
}

type FallbackRender = (props: FallbackProps) => ReactElement

export interface AppErrorBoundaryProps {
  children: ReactNode
  fallback?: ReactElement | FallbackRender
  onError?: (error: Error, componentStack: string) => void
}

interface AppErrorBoundaryState {
  hasError: boolean
  error: Error | null
  componentStack: string | null
}

class AppErrorBoundary extends Component<
  AppErrorBoundaryProps,
  AppErrorBoundaryState
> {
  constructor(props: AppErrorBoundaryProps) {
    super(props)
    this.state = {
      hasError: false,
      error: null,
      componentStack: null,
    }
  }

  static getDerivedStateFromError(error: Error) {
    return {
      hasError: true,
      error,
      componentStack: error.stack || null,
    }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    const componentStack = errorInfo.componentStack || null

    this.setState({
      hasError: true,
      error,
      componentStack,
    })

    if (this.props.onError) {
      this.props.onError(error, componentStack || '')
    }

    Sentry.withScope(scope => {
      if (componentStack) {
        scope.setExtras({ componentStack })
      }
      Sentry.captureException(error)
    })
  }

  resetError = () => {
    this.setState({
      hasError: false,
      error: null,
      componentStack: null,
    })
  }

  render() {
    const { hasError, error, componentStack } = this.state
    const { children, fallback } = this.props

    if (hasError && error) {
      const defaultFallback = (
        <div className="min-h-screen flex items-center justify-center p-4 bg-white dark:bg-gray-950">
          <div className="max-w-prose">
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
              Something went wrong
            </h3>
            <p className="text-gray-700 dark:text-gray-300 mb-6">
              {error.toString()}
            </p>
            {import.meta.env.DEV && componentStack && (
              <pre className="text-xs bg-gray-100 dark:bg-gray-900 p-4 rounded overflow-auto mb-6 text-gray-700 dark:text-gray-300">
                {componentStack}
              </pre>
            )}
            <button
              onClick={this.resetError}
              className="text-primary-600 dark:text-primary-400 hover:underline"
            >
              Try again
            </button>
          </div>
        </div>
      )

      if (fallback) {
        if (typeof fallback === 'function') {
          return fallback({
            error,
            componentStack,
            resetError: this.resetError,
          })
        }
        return fallback
      }

      return defaultFallback
    }

    return children
  }
}

export const withErrorBoundary = <P extends object>(
  Component: ComponentType<P>,
  options?: Omit<AppErrorBoundaryProps, 'children'>
): React.FC<P> => {
  const WrappedComponent: React.FC<P> = props => (
    <AppErrorBoundary {...options}>
      <Component {...props} />
    </AppErrorBoundary>
  )

  const componentName = Component.displayName || Component.name || 'Component'
  WrappedComponent.displayName = `withErrorBoundary(${componentName})`

  return WrappedComponent
}

export default AppErrorBoundary
