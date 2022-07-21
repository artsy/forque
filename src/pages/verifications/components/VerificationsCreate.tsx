import { Input, Spacer, Button, useToasts, Banner } from "@artsy/palette"
import { Form, Formik } from "formik"
import * as Yup from "yup"
import { useCreateIdentityVerification } from "../mutations/useCreateIdentityVerification"

interface VerificationsCreateProps {
  email?: string
}

interface VerificationURLMessage {
  message?: string
  url: string
}

const displayVerificationURL = (url: string) => {
  const forceUrl = process.env.production
    ? "https://artsy.net"
    : "https://staging.artsy.net"

  return {
    message: "The following verification URL was sent to the user:",
    url: `${forceUrl}/${url}`,
  }
}

let verificationURLMessage: VerificationURLMessage

export const VerificationsCreate: React.FC<VerificationsCreateProps> = (
  props
) => {
  const { submitMutation: submitIdentityVerificationMutation } =
    useCreateIdentityVerification()

  const { sendToast } = useToasts()

  interface InputTypes {
    email: string
    name: string
  }

  return (
    <>
      {verificationURLMessage && (
        <Banner variant="defaultLight">
          <p>
            {verificationURLMessage.message} <br></br>
            <a href={verificationURLMessage.url}>
              {verificationURLMessage.url}
            </a>
          </p>
        </Banner>
      )}
      <Formik<InputTypes>
        initialValues={{ email: props.email ?? "", name: "" }}
        validationSchema={Yup.object().shape({
          email: Yup.string()
            .required("A user email is required")
            .email("Please enter a valid email"),
        })}
        onSubmit={async (values, { resetForm }) => {
          console.log(values)
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

            const verificationURL: string =
              mutationResponse.sendIdentityVerificationEmail
                ?.confirmationOrError?.identityVerificationEmail
                ?.verificationURL ?? ""
            verificationURLMessage = displayVerificationURL(verificationURL)

            resetForm()
            sendToast({
              variant: "success",
              message: "Identity verification created",
            })
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
