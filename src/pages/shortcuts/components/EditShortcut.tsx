import { Form, Formik } from "formik"
import { useGravity } from "hooks"
import { Button, Input, Spacer, useToasts } from "@artsy/palette"
import { useEffect, useState } from "react"
import * as Yup from "yup"
import { CreateOrEditShortcut } from "./CreateOrEditShortcut"

export const EditShortcut = () => {
  const { sendToast } = useToasts()
  //TODO: fix this any
  const [searchResponse, setSearchResponse] = useState<any>()

  const { data, error } = useGravity(`shortcut/${searchResponse}`)

  useEffect(() => {
    // TODO: probably a better way to do this.
    if (error && searchResponse) {
      sendToast({
        variant: "error",
        message: "Something went wrong :(",
      })
    }
  }, [searchResponse, error, sendToast, data])

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
          setSearchResponse(values.search)
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
      {data && (
        <CreateOrEditShortcut
          isEditContext={true}
          short={data.short}
          long={data.long.includes("?") ? data.long.split("?")[0] : data.long}
        />
      )}
    </>
  )
}
