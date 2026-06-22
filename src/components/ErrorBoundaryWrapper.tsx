'use client'

import React from 'react'
import { FiAlertTriangle, FiRefreshCw } from 'react-icons/fi'

interface ErrorFallbackProps {
  error: Error | null
  reset: () => void
}

function ErrorFallback({ error, reset }: ErrorFallbackProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[200px] p-8 text-center">
      <div className="w-12 h-12 rounded-full bg-rose/10 border border-rose/20 flex items-center justify-center mb-4">
        <FiAlertTriangle className="w-5 h-5 text-rose" />
      </div>
      <h3 className="font-serif text-lg font-light text-charcoal mb-1">
        Something went wrong
      </h3>
      <p className="font-serif italic text-xs text-stone-400 mb-6 max-w-xs">
        {error?.message ?? 'An unexpected error occurred. Please try again.'}
      </p>
      <button
        onClick={reset}
        className="inline-flex items-center gap-2 px-4 py-2 font-sans text-[10px] uppercase tracking-widest font-bold bg-charcoal text-white rounded-xl hover:bg-black transition-colors cursor-pointer"
      >
        <FiRefreshCw className="w-3.5 h-3.5" />
        Try again
      </button>
    </div>
  )
}

interface ErrorBoundaryState {
  hasError: boolean
  error: Error | null
}

interface ErrorBoundaryComponentProps {
  children: React.ReactNode
  fallback?: React.ReactNode
  onReset?: () => void
}

class ErrorBoundaryComponent extends React.Component<
  ErrorBoundaryComponentProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryComponentProps) {
    super(props)
    this.state = { hasError: false, error: null }
    this.reset = this.reset.bind(this)
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error }
  }

  reset() {
    this.props.onReset?.()
    this.setState({ hasError: false, error: null })
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback ?? (
          <ErrorFallback error={this.state.error} reset={this.reset} />
        )
      )
    }
    return this.props.children
  }
}

interface ErrorBoundaryWrapperProps {
  children: React.ReactNode
  fallback?: React.ReactNode
  onReset?: () => void
}

export function ErrorBoundaryWrapper({
  children,
  fallback,
  onReset,
}: ErrorBoundaryWrapperProps) {
  return (
    <ErrorBoundaryComponent
      fallback={fallback}
      {...(onReset !== undefined ? { onReset } : {})}
    >
      {children}
    </ErrorBoundaryComponent>
  )
}
