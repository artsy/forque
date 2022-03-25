import { render, RenderResult } from "@testing-library/react"
import { QueryRenderer } from "react-relay"
import { MockResolvers } from "relay-test-utils/lib/RelayMockPayloadGenerator"
import {
  MockPayloadGenerator,
  createMockEnvironment,
  RelayMockEnvironment,
} from "relay-test-utils"
import { GraphQLTaggedNode, OperationType } from "relay-runtime"

type SetupTestWrapper<T extends OperationType> = {
  Component: React.ComponentType<T["response"]>
  query: GraphQLTaggedNode
  variables?: T["variables"]
}

/**
 * Creates a React Testing Library-based wrapper for testing Relay components
 * using the `relay-test-utils` package, which will provide automatic fixture
 * data for GraphQL queries.
 *
 * @see https://relay.dev/docs/en/testing-relay-components
 * @see https://testing-library.com/docs/react-testing-library/
 */

type RTLRenderResult = RenderResult<
  typeof import("@testing-library/dom/types/queries"),
  HTMLElement
>

type RenderWithRelay = RTLRenderResult & { env: RelayMockEnvironment }

export const setupTestWrapper = <T extends OperationType>({
  Component,
  query,
  variables = {},
}: SetupTestWrapper<T>) => {
  const renderWithRelay = (
    mockResolvers: MockResolvers = {},
    manualEnvControl?: boolean
  ): RenderWithRelay => {
    const env = createMockEnvironment()
    const TestRenderer = () => (
      <QueryRenderer<T>
        environment={env}
        variables={variables}
        query={query}
        render={({ props, error }) => {
          if (props) {
            // @ts-ignore
            return <Component {...props} />
          } else if (error) {
            console.error(error)
          }
        }}
      />
    )

    const view = render(<TestRenderer />)

    if (!manualEnvControl) {
      env.mock.resolveMostRecentOperation((operation: any) => {
        return MockPayloadGenerator.generate(operation, mockResolvers)
      })
    }

    return { ...view, env }
  }

  return { renderWithRelay }
}
