import { Input, Spacer, Button, useToasts, Banner } from "@artsy/palette"
import { Form, Formik } from "formik"
import * as Yup from "yup"
import React, { useState } from "react"
import { useCreateIdentityVerification } from "../mutations/useCreateIdentityVerification"

interface VerificationsCreateProps {
  email?: string
}

interface VerificationMessage {
  recipient?: string
  url?: string
}

export const VerificationsCreate: React.FC<VerificationsCreateProps> = (
  props
) => {
  const { submitMutation: submitIdentityVerificationMutation } =
    useCreateIdentityVerification()

  const { sendToast } = useToasts()

  const [verificationMessage, setVerificationMessage] =
    useState<VerificationMessage>({})

  interface InputTypes {
    email: string
    name: string
  }

  return (
    <>
      {verificationMessage.url && (
        <>
          <Banner variant="defaultLight">
            <p>
              {verificationMessage.recipient} <br></br>
              <a href={verificationMessage.url}>{verificationMessage.url}</a>
            </p>
          </Banner>
          <Spacer my={2} />
        </>
      )}
      <Formik<InputTypes>
        initialValues={{ email: props.email ?? "", name: "" }}
        validationSchema={Yup.object().shape({
          email: Yup.string()
            .required("A user email is required")
            .email("Please enter a valid email"),
        })}
        onSubmit={async (values, { resetForm }) => {
          try {
            const mutationResponse = await submitIdentityVerificationMutation({
              variables: {
                input: {
                  email: values.email,
                  name: values.name,
                },
              },
              rejectIf: (res) => {
                return res.sendIdentityVerificationEmail?.confirmationOrError
                  ?.mutationError
              },
            })

            const pageURL: string =
              mutationResponse.sendIdentityVerificationEmail
                ?.confirmationOrError?.identityVerification?.pageURL ?? ""

            setVerificationMessage({
              recipient: `Identify verification sent to ${values.email}`,
              url: `Verification Page URL: ${pageURL}`,
            })

            resetForm()
            sendToast({
              variant: "success",
              message: "Identity verification created",
            })
            resetForm()
          } catch (err) {
            console.error("[forque] Error creating identity verification:", err)

            const error = Array.isArray(err) ? err[0] : err

            sendToast({
              variant: "error",
              message: "There was an error creating the identity verification",
              description: error.message,
            })
          }
        }}
      >
        {({ values, handleChange, errors }) => (
          <Form>
            <Input
              description="Name to be associated with the verification request. When provided, this will be used instead of the name associated with the User's account."
              placeholder="Jane Doe"
              title="Full Name"
              name="name"
              type="text"
              onChange={handleChange}
              value={values.name}
              error={errors.name}
            />
            <Spacer my={2} />
            <Input
              placeholder="user@example.com"
              title="Email"
              name="email"
              type="text"
              onChange={handleChange}
              value={values.email}
              error={errors.email}
            />
            <Spacer my={4} />
            <Button type="submit" width="100%">
              Create
            </Button>
          </Form>
        )}
      </Formik>
    </>
  )
}
