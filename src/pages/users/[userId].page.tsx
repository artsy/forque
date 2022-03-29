import { GetServerSideProps } from "next"
import { fetchRelayData } from "system/relay"
import { graphql } from "relay-runtime"
import { UserIdQuery } from "__generated__/UserIdQuery.graphql"
import { Button, Flex, Spacer, Text } from "@artsy/palette"
import { Form, Formik } from "formik"
import { UserFormValues, userValidationSchema } from "./useUserFormContext"
import { UserForm } from "./components/form"
import { useUpdateUser } from "./mutations/useUpdateUser"

interface UserProps {
  user: UserIdQuery["response"]["user"]
}

const User: React.FC<UserProps> = ({ user }) => {
  const { submitMutation } = useUpdateUser()

  if (!user) {
    return null
  }

  return (
    <Formik<UserFormValues>
      initialValues={{
        name: user.name,
        email: user.email,
      }}
      validationSchema={userValidationSchema}
      onSubmit={async (values) => {
        try {
          await submitMutation({
            variables: {
              input: {
                id: user.internalID,
                email: values.email,
              },
            },
          })
        } catch (error) {
          console.error("[forque] Error updating user:", error)
        }
      }}
    >
      {({ isSubmitting, isValid }) => {
        return (
          <Form>
            <Flex justifyContent="space-between" alignItems="center">
              <Text variant="xl">Edit User</Text>
              <Button
                loading={
                  // FIXME: Fix this in palette
                  isSubmitting ? ("true" as unknown as boolean) : undefined
                }
                disabled={!isValid}
                type="submit"
              >
                Update
              </Button>
            </Flex>

            <Spacer my={4} />

            <UserForm />
          </Form>
        )
      }}
    </Formik>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const props = await fetchRelayData({
    query: graphql`
      query UserIdQuery($userId: String!) {
        user(id: $userId) {
          internalID
          email
          name
        }
      }
    `,
    variables: {
      userId: ctx.query.userId,
    },
    ctx,
  })

  return {
    props,
  }
}

export default User
