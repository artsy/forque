import { Form, Formik } from "formik"
import { Button, Input, Spacer, useToasts } from "@artsy/palette"
import { useState } from "react"
import * as Yup from "yup"
import { CreateOrEditShortcut } from "./CreateOrEditShortcut"
import { useSession } from "next-auth/react"
import { UserWithAccessToken } from "system"

export const EditShortcut = () => {
  const session = useSession()
  const user = session.data?.user as UserWithAccessToken
  const { accessToken } = user

  const { sendToast } = useToasts()
  //TODO: fix this any
  const [searchResponse, setSearchResponse] = useState<any>()

  const handleSubmit = async (searchTerm: string) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_GRAVITY_URL}/api/v1/shortcut/${searchTerm}`,
        {
          headers: {
            "Content-Type": "application/json",
            "X-Access-Token": accessToken,
          },
        }
      )

      const json = await response.json()

      if (json.error) {
        sendToast({
          variant: "error",
          message: json.error,
        })
        return
      }

      setSearchResponse(json)
      return json
    } catch (error) {
      console.error(`[FORQUE] error updating shortcut: ${error}`)
    }
  }

  return (
    <>
      <Formik
        initialValues={{
          search: "",
        }}
        validationSchema={Yup.object({
          search: Yup.string().required("url required"),
        })}
        onSubmit={(values) => {
          handleSubmit(values.search)
        }}
      >
        {({ values, handleChange }) => (
          <Form>
            <Input
              placeholder="Short URL"
              title="artsy.net/"
              name="search"
              type="text"
              onChange={handleChange}
              value={values.search}
            />
            <Spacer my={4} />
            <Button type="submit" width="100%">
              Find it
            </Button>
          </Form>
        )}
      </Formik>
      <Spacer my={4} />
      {searchResponse && (
        <CreateOrEditShortcut
          isEditContext={true}
          shortToBeEdited={searchResponse.short}
          longToBeEdited={
            searchResponse.long?.includes("?")
              ? searchResponse.long?.split("?")[0]
              : searchResponse.long
          }
        />
      )}
    </>
  )
}
