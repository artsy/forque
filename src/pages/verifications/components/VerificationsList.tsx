import { Button, Column, GridColumns, Input, Text } from "@artsy/palette"
import Head from "next/head"
import { fetchRelayData } from "system/relay"
import { useSession } from "next-auth/react"
import { GetServerSideProps } from "next"
import { graphql } from "relay-runtime"
import { useFragment } from "react-relay"
import { Action, assertPermitted, UserWithAccessToken } from "system"
import { useRouter } from "next/router"
import { VerificationsTable } from "./VerificationsTable"
import { VerificationsList_viewer$key } from "__generated__/VerificationsList_viewer.graphql"
import { Form, Formik } from "formik"
import * as Yup from "yup"
import { useState, useEffect } from "react"

interface VerificationsListProps {
  viewer: VerificationsList_viewer$key
}

export const VerificationsList: React.FC<VerificationsListProps> = ({ viewer }) => {
  const router = useRouter()
  const { query } = useRouter();

  const email = query.email

  const viewerData = useFragment(
    graphql`
      fragment VerificationsList_viewer on Viewer {
        ...VerificationsTable_viewer
      }
    `,
    viewer,
  );

  const [gotEmail, setGotEmail] = useState(false)

  useEffect(() => {
    if (query.email !== undefined) {
      setGotEmail(true)
    }
  });

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
        {({
          values,
          handleChange,
        }) => {
          return (
            <Form>
              <Input
                name="emailInput"
                title="email"
                type="emailInput"
                placeholder="Verifiee's email"
                value={values.emailInput}
                onChange={handleChange}
              />
              <Button
                type="submit"
                width="100%"
                size="medium"
              >
                Search
              </Button>
            </Form>
          )
        }}
      </Formik>
      {gotEmail && (
        <VerificationsTable viewer={viewerData} email={query.email} />
      )}
    </>
  )
}
