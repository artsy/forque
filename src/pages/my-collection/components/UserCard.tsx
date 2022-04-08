import { Box, Separator, SkeletonText, Text } from "@artsy/palette"
import { debounce } from "lodash"
import React, { startTransition, useEffect, useState } from "react"
import { validateEmail } from "utils/validateEmail"
import { useFetchUserByEmailQuery$data } from "__generated__/useFetchUserByEmailQuery.graphql"
import { useFetchUserByEmail } from "../queries/useFetchUserByEmail"

interface UserCardProps {
  email: string
}

export const UserCard: React.FC<UserCardProps> = ({ email }) => {
  const fetchUserByEmail = useFetchUserByEmail()

  const [user, setUser] = useState<useFetchUserByEmailQuery$data["user"]>()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  const fetchUser = async () => {
    if (!validateEmail(email)) {
      return
    }

    try {
      const response = await fetchUserByEmail(email)

      setUser(response?.user)
    } catch (error) {
      setError(true)
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const debouncedFetchUser = debounce(fetchUser, 500)

  useEffect(() => {
    startTransition(() => {
      setError(false)
      setLoading(true)
      debouncedFetchUser()
    })
  }, [email])

  if (!validateEmail(email)) {
    return (
      <Wrapper>
        <Text>Please enter a valid email.</Text>
      </Wrapper>
    )
  }

  if (error) {
    return (
      <Wrapper>
        <Text>User not found.</Text>
      </Wrapper>
    )
  }

  return (
    <Wrapper>
      <Field fieldName={"Name"} fieldValue={user?.name} loading={loading} />
      <Separator my={1} />
      <Field fieldName={"Email"} fieldValue={email} loading={loading} />
      <Separator my={1} />
      <Field
        fieldName={"User ID"}
        fieldValue={user?.internalID}
        loading={loading}
      />
    </Wrapper>
  )
}

const Wrapper: React.FC = ({ children }) => (
  <Box border="1px solid" borderColor="black10" p={1} my={1}>
    {children}
  </Box>
)

const Field: React.FC<{
  fieldName: string
  fieldValue?: string
  loading: boolean
}> = ({ fieldName, fieldValue, loading }) => {
  return (
    <>
      <Text color="black60" variant="xs">
        {fieldName}
      </Text>
      {loading ? (
        <SkeletonText>{fieldName}</SkeletonText>
      ) : (
        <Text color="black">{fieldValue ?? "/"}</Text>
      )}
    </>
  )
}
