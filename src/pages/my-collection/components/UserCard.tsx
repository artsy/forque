import { Box, Separator, Text } from "@artsy/palette"
import React, { Suspense } from "react"
import { graphql, useLazyLoadQuery } from "react-relay"
import { ErrorBoundary } from "system/ErrorBoundary"
import { UserCardQuery } from "__generated__/UserCardQuery.graphql"

interface UserCardProps {
  email: string
}

export const UserCardComponent: React.FC<UserCardProps> = ({ email }) => {
  const { user } = useLazyLoadQuery<UserCardQuery>(
    graphql`
      query UserCardQuery($email: String!) {
        user(email: $email) {
          internalID
          name
          userAlreadyExists
        }
      }
    `,
    { email }
  )

  if (!user) {
    return (
      <Wrapper>
        <Text>User not found.</Text>
      </Wrapper>
    )
  }

  return (
    <Wrapper>
      <Field fieldName={"Name"} fieldValue={user?.name} />
      <Separator my={1} />
      <Field fieldName={"Email"} fieldValue={email} />
      <Separator my={1} />
      <Field fieldName={"User ID"} fieldValue={user?.internalID} />
    </Wrapper>
  )
}

export const UserCard: React.FC<UserCardProps> = ({ email }) => (
  <ErrorBoundary>
    <Suspense fallback={null}>
      <UserCardComponent email={email} />
    </Suspense>
  </ErrorBoundary>
)

const Wrapper: React.FC = ({ children }) => (
  <Box border="1px solid" borderColor="black10" p={1} my={1}>
    {children}
  </Box>
)

const Field: React.FC<{
  fieldName: string
  fieldValue?: string
}> = ({ fieldName, fieldValue }) => {
  return (
    <>
      <Text color="black60" variant="xs">
        {fieldName}
      </Text>
      <Text variant="sm" color="black">
        {fieldValue ?? "/"}
      </Text>
    </>
  )
}
