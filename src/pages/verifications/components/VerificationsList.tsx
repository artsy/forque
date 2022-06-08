import { Button, Input } from "@artsy/palette"
import { useRouter } from "next/router"
import { useState, useEffect } from "react"
import { useLazyLoadQuery } from "react-relay"
import { graphql } from "relay-runtime"
import { VerificationsTable } from "./VerificationsTable"
import { Form, Formik } from "formik"

export const VerificationsList: React.FC = () => {
  const router = useRouter()
  const query = router.query
  const email = query.email

  const viewerData = useLazyLoadQuery(
    graphql`
      query VerificationsListQuery($email: String) {
        viewer {
          ...VerificationsTable_viewer
        }
      }
    `,
    { email }
  )

  const [gotEmail, setGotEmail] = useState(false)

  useEffect(() => {
    if (query.email !== undefined) {
      setGotEmail(true)
    }
  })

  return (
    <>
      <Formik
        initialValues={{
          emailInput: "",
        }}
        onSubmit={({ emailInput }) => {
          setGotEmail(true)
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
                placeholder="Email of the person to be identity verified"
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
      {gotEmail && <VerificationsTable viewer={viewerData["viewer"]} />}
    </>
  )
}
