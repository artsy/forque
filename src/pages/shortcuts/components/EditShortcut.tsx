import { Form, Formik } from "formik"
import { Button, Flex, Input, Spacer, useToasts } from "@artsy/palette"
import { useState } from "react"
import * as Yup from "yup"
import { CreateOrEditShortcutForm } from "./CreateOrEditShortcutForm"
import { useSession } from "next-auth/react"
import { UserWithAccessToken } from "system"
import getConfig from "next/config"

interface SearchResponse {
  id: string
  short: string
  long: string
}

export const EditShortcut = () => {
  const session = useSession()
  const user = session.data?.user as UserWithAccessToken
  const { accessToken } = user

  const { sendToast } = useToasts()

  const { publicRuntimeConfig } = getConfig()

  const [searchResponse, setSearchResponse] = useState<SearchResponse>()

  const handleSubmit = async (searchTerm: string) => {
    try {
      const response = await fetch(
        `${publicRuntimeConfig.NEXT_PUBLIC_GRAVITY_URL}/api/v1/shortcut/${searchTerm}`,
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
            <Spacer />
            <Flex alignItems="flex-end">
              <Input
                placeholder="Short URL"
                title="artsy.net/"
                name="search"
                type="text"
                onChange={handleChange}
                value={values.search}
                width="50%"
              />
              <Button type="submit" ml={4}>
                Find it
              </Button>
            </Flex>
          </Form>
        )}
      </Formik>
      <Spacer my={4} />
      {searchResponse && (
        <CreateOrEditShortcutForm
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
