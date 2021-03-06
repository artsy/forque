import { Button, Input, Spacer } from "@artsy/palette"
import { useState } from "react"
import { Form, Formik } from "formik"
import * as Yup from "yup"
import { useRouter } from "next/router"
import { VerificationsResults } from "./VerificationsResults"

interface VerificationsListProps {
  email?: string
}

export const VerificationsList: React.FC<VerificationsListProps> = (props) => {
  const [email, setEmail] = useState("")

  const router = useRouter()
  const [userId, setUserId] = useState(router.query.userId as string)

  interface InputTypes {
    emailInput: string
  }

  return (
    <>
      <Formik<InputTypes>
        initialValues={{
          emailInput: props.email ?? "",
        }}
        onSubmit={({ emailInput }, { resetForm }) => {
          setUserId("")
          setEmail(emailInput)
          resetForm()
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
      {(!!email || !!userId) && (
        <VerificationsResults email={email} userId={userId} />
      )}
    </>
  )
}
