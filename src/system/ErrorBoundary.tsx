import React, { ReactNode } from "react"
import { Text } from "@artsy/palette"

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
  errorMessage: string
}

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: any) {
    super(props)

    this.state = {
      hasError: false,
      errorMessage: "Something went wrong",
    }
  }

  static getDerivedStateFromError(error: Error): Partial<State> {
    return {
      hasError: true,
      errorMessage: error.message,
    }
  }

  componentDidCatch(error: any, errorInfo: any) {
    // TODO: send this to Sentry in addition / instead?
    console.error("[forque] Error:", error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div>
          <Text as="h1" variant="xxl">
            Error
          </Text>

          <Text variant="lg" mt={2} color="red100">
            {this.state.errorMessage}
          </Text>
        </div>
      )
    }

    return this.props.children
  }
}
