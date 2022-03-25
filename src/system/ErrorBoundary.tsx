import React from "react"

interface ErrorBoundaryState {
  hasError: boolean
  error: any
}

export class ErrorBoundary extends React.Component<
  React.ComponentPropsWithRef<any>,
  ErrorBoundaryState
> {
  constructor(props: any) {
    super(props)

    this.state = {
      hasError: false,
      error: null,
    }
  }

  static getDerivedStateFromError(error: any) {
    return {
      hasError: true,
      error,
    }
  }

  componentDidCatch(error: any, errorInfo: any) {
    console.error("[forque] Error:", error, errorInfo)
  }

  render() {
    const { hasError, error, children } = this.props

    if (hasError) {
      return (
        <div>
          <h1>Something went wrong.</h1>
          <pre>{error}</pre>
        </div>
      )
    }

    return children
  }
}
