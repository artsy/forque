import { Button, Input, Spacer } from "@artsy/palette"
import { useState } from "react"
import { Form, Formik } from "formik"
import * as Yup from "yup"
import { VerificationsResults } from "./VerificationsResults"

export const VerificationsList: React.FC = () => {
  const [email, setEmail] = useState("")

  interface InputTypes {
    emailInput: string
  }

  return (
    <>
      <Formik<InputTypes>
        initialValues={{
          emailInput: "",
        }}
        onSubmit={({ emailInput }) => {
          setEmail(emailInput)
        }}
        validateOnChange={true}
        validationSchema={Yup.object().shape({
          emailInput: Yup.string()
            .required("An email is required")
            .email("Please enter a valid email"),
        })}
      >
        {({ values, handleChange, errors }) => {
          return (
            <Form>
              <Input
                error={errors.emailInput}
                name="emailInput"
                onChange={handleChange}
                placeholder="user@example.com"
                title="email"
                type="text"
                value={values.emailInput}
              />
              <Spacer my={4} />
              <Button type="submit" width="100%">
                Search
              </Button>
            </Form>
          )
        }}
      </Formik>
      {!!email && <VerificationsResults email={email} />}
    </>
  )
}
