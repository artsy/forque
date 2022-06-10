import { Button, Input } from "@artsy/palette"
import { useRouter } from "next/router"
import { useLazyLoadQuery } from "react-relay"
import { graphql } from "relay-runtime"
import { Form, Formik } from "formik"
import { VerificationsTable } from "./VerificationsTable"
import { VerificationsListQuery } from "__generated__/VerificationsListQuery.graphql"

export const VerificationsList: React.FC = () => {
  const router = useRouter()
  const query = router.query
  const email = query.email as string

  const viewerData = useLazyLoadQuery<VerificationsListQuery>(
    graphql`
      query VerificationsListQuery($email: String) {
        viewer {
          ...VerificationsTable_viewer
        }
      }
    `,
    { email },
    // otherwise relay fetches on page load, with undefined email, and pulls all data
    { fetchPolicy: !email ? "store-only" : "store-or-network" }
  )

  return (
    <>
      <Formik
        initialValues={{
          emailInput: "",
        }}
        onSubmit={({ emailInput }) => {
          router.push("/verifications?" + "email=" + emailInput)
        }}
      >
        {({ values, handleChange }) => {
          return (
            <Form>
              <Input
                name="emailInput"
                title="email"
                type="emailInput"
                placeholder="Email of the person who was identity verified"
                value={values.emailInput}
                onChange={handleChange}
              />
              <Button type="submit" width="100%" size="medium">
                Search
              </Button>
            </Form>
          )
        }}
      </Formik>

      {email && (
        <VerificationsTable viewer={viewerData.viewer!} email={email} />
      )}
    </>
  )
}