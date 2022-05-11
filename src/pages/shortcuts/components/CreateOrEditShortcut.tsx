import {
  Input,
  Spacer,
  Checkbox,
  Button,
  useToasts,
  Text,
} from "@artsy/palette"
import { FC, useState } from "react"
import { Form, Formik } from "formik"
import * as Yup from "yup"
import { useSession } from "next-auth/react"
import { UserWithAccessToken } from "system"
import { returnUTMString } from "../helpers/shortcutHelpers"

interface CreateOrEditShortcutProps {
  isEditContext: boolean
  shortToBeEdited?: string | undefined
  longToBeEdited?: string | undefined
}

interface ShortcutResponse {
  id: string
  short: string
  long: string
}

interface FormValues {
  long: string
  short: string
  showUtm: boolean
  source: string
  medium: string
  campaign: string
  content: string
  term: string
}

export const CreateOrEditShortcut: FC<CreateOrEditShortcutProps> = ({
  shortToBeEdited,
  longToBeEdited,
  isEditContext,
}) => {
  const session = useSession()
  const user = session.data?.user as UserWithAccessToken
  const { accessToken } = user

  const { sendToast } = useToasts()

  const [shortcutResponse, setShortcutResponse] = useState<ShortcutResponse>()

  const handleSubmit = async (values: FormValues) => {
    const {
      long,
      short,
      source,
      medium,
      campaign: campaign,
      content,
      term,
    } = values

    const utmString = returnUTMString({
      source,
      medium,
      campaign,
      content,
      term,
    })

    const longUrlWithUtm = utmString ? `${long}?${utmString}` : long

    try {
      const url = isEditContext
        ? `${process.env.NEXT_PUBLIC_GRAVITY_URL}/api/v1/shortcut/${shortToBeEdited}`
        : `${process.env.NEXT_PUBLIC_GRAVITY_URL}/api/v1/shortcut`

      const method = isEditContext ? "PUT" : "POST"

      const response = await fetch(url, {
        headers: {
          "Content-Type": "application/json",
          "X-Access-Token": accessToken,
        },
        method,
        body: JSON.stringify({
          short,
          long: longUrlWithUtm,
        }),
      })

      const json = await response.json()

      if (json.message) {
        sendToast({
          variant: "error",
          message: json.message,
        })
        return
      }

      sendToast({
        variant: "success",
        message: "Shortcut created",
      })

      setShortcutResponse(json)
      return json
    } catch (error) {
      console.error(`[FORQUE] error creating shortcut: ${error}`)
    }
  }

  const initialValues: FormValues = {
    short: shortToBeEdited ?? "",
    long: longToBeEdited ?? "",
    showUtm: false,
    source: "",
    medium: "",
    campaign: "",
    content: "",
    term: "",
  }

  return (
    <>
      <Formik
        initialValues={{
          ...initialValues,
        }}
        validationSchema={Yup.object().shape({
          long: Yup.string().required("A target URL is required"),
        })}
        onSubmit={(values) => {
          handleSubmit(values)
        }}
      >
        {({ values, handleChange, errors, setFieldValue }) => (
          <Form>
            <Input
              placeholder="Short URL"
              title="artsy.net/"
              name="short"
              type="text"
              onChange={handleChange}
              value={values.short}
            />
            <Spacer my={4} />
            <Input
              placeholder="Target URL"
              title="Redirects to"
              name="long"
              type="text"
              onChange={handleChange}
              value={values.long}
              error={errors.long}
            />
            <Spacer my={4} />
            <Checkbox
              onSelect={(selected) => {
                setFieldValue("showUtm", selected)
              }}
              selected={values.showUtm}
            >
              Add/Edit UTM tags (optional)
            </Checkbox>
            <Spacer my={4} />
            {values.showUtm && (
              <>
                <Input
                  placeholder="e.g. google, facebook, baerfaxt, nextarads"
                  title="Source"
                  name="source"
                  type="text"
                  onChange={handleChange}
                  value={values.source}
                  error={errors.source}
                />
                <Spacer my={4} />
                <Input
                  placeholder="e.g. email, banner, social"
                  title="Medium"
                  name="medium"
                  type="text"
                  onChange={handleChange}
                  value={values.medium}
                />
                <Spacer my={4} />
                <Input
                  placeholder="e.g. gallery-insight, art-basel, auction-sothebys-2022-oct"
                  title="Campaign"
                  name="campaign"
                  type="text"
                  onChange={handleChange}
                  value={values.campaign}
                />
                <Spacer my={4} />
                <Input
                  placeholder="e.g. link-newsfeed-desktop_ ,general_ ,CTA2_"
                  title="Content"
                  name="content"
                  type="text"
                  onChange={handleChange}
                  value={values.content}
                />
                <Spacer my={4} />
                <Input
                  placeholder="e.g. fair, list, auction"
                  title="Term"
                  name="term"
                  type="text"
                  onChange={handleChange}
                  value={values.term}
                />
                <Spacer my={4} />
              </>
            )}
            <Spacer my={4} />
            {isEditContext ? (
              <Button type="submit" width="100%">
                Update
              </Button>
            ) : (
              <Button type="submit" width="100%">
                Create
              </Button>
            )}
            <Spacer my={4} />
            {shortcutResponse && (
              <>
                <Text>ID:</Text>
                <Text>{shortcutResponse.id}</Text>
                <Spacer my={2} />
                <Text>Short:</Text>
                <Text>{shortcutResponse.short}</Text>
                <Spacer my={2} />
                <Text>Long:</Text>
                <Text>{shortcutResponse.long}</Text>
              </>
            )}
          </Form>
        )}
      </Formik>
    </>
  )
}
