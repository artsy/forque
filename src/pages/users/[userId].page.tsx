import { GetServerSideProps } from "next"
import { fetchRelayData } from "system/relay"
import { graphql } from "relay-runtime"
import { UserIdQuery } from "__generated__/UserIdQuery.graphql"
import { Button, Join, Spacer } from "@artsy/palette"
import { Form, Formik } from "formik"
import { UserFormValues } from "./useFormContext"
import { UserForm } from "./UserForm"

interface UserProps {
  user: UserIdQuery["response"]["user"]
}

const User: React.FC<UserProps> = ({ user }) => {
  const handleSubmit = () => {
    console.log("submitting")
  }

  if (!user) {
    return null
  }

  return (
    <Formik<UserFormValues>
      initialValues={{
        name: user.name,
        email: user.email,
      }}
      onSubmit={handleSubmit}
      // TODO
      // validationSchema={confirmRegistrationValidationSchema}
    >
      {({ isSubmitting, isValid }) => {
        return (
          <Form>
            <Join separator={<Spacer my={2} />}>
              <UserForm />

              <Button loading={isSubmitting} disabled={!isValid} type="submit">
                Update
              </Button>
            </Join>
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
        me {
          name
        }
        user(id: $userId) {
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
