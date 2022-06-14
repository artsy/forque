import { Input, Spacer, Button, useToasts } from "@artsy/palette"
import { Form, Formik } from "formik"
import * as Yup from "yup"
import { useCreateIdentityVerification } from "../mutations/useCreateIdentityVerification"

export const VarificationCreate: React.FC = () => {
  const { submitMutation: submitIdentityVerificationMutation } =
    useCreateIdentityVerification()

  const { sendToast } = useToasts()

  interface InputTypes {
    email: string
  }

  return (
    <>
      <Formik<InputTypes>
        initialValues={{ email: "" }}
        validationSchema={Yup.object().shape({
          email: Yup.string()
            .required("A user email is required")
            .email("Please enter a valid email"),
        })}
        onSubmit={async (values) => {
          try {
            await submitIdentityVerificationMutation({
              variables: {
                input: {
                  email: values.email,
                },
              },
              rejectIf: (res) => {
                return res.sendIdentityVerificationEmail?.confirmationOrError
                  ?.mutationError
              },
            })
            sendToast({
              variant: "success",
              message: "Identity verification created",
            })
          } catch (error) {
            console.error(
              "[forque] Error creating identity verification:",
              error
            )

            sendToast({
              variant: "error",
              message: "There was an error creating the identity verification",
            })
          }
        }}
      >
        {({ values, handleChange, errors }) => (
          <Form>
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
