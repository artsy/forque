import {
  Input,
  Spacer,
  Checkbox,
  Button,
  useToasts,
  StackableBorderBox,
  Text,
} from "@artsy/palette"
import { FC, useEffect, useState } from "react"
import { Form, Formik } from "formik"
import * as Yup from "yup"
import { useSession } from "next-auth/react"
import { UserWithAccessToken } from "system"

interface CreateOrEditShortcutProps extends ShortcutResponse {
  isEditContext?: boolean
}

interface ShortcutResponse {
  id?: string
  short?: string
  long?: string
}

interface FormValues {
  long: string
  short: string
  showUtm: boolean
  source: string
  medium: string
  //TODO: Make sure this is the right syntax for the UTM string param
  campaignName: string
  content: string
  term: string
}

export const CreateOrEditShortcut: FC<CreateOrEditShortcutProps> = ({
  short,
  long,
  isEditContext,
}) => {
  const session = useSession()
  const user = session.data?.user as UserWithAccessToken
  const { accessToken } = user

  const { sendToast } = useToasts()

  const [shortcutResponse, setShortcutResponse] = useState<ShortcutResponse>()
  const [isEdit, setIsEdit] = useState(false)

  useEffect(() => {
    if (isEditContext) setIsEdit(true)
  }, [setIsEdit, isEditContext])

  const handleSubmit = async (values: FormValues) => {
    const { long, short, source, medium, campaignName, content, term } = values

    const utmString = returnUTMString({
      source,
      medium,
      campaignName,
      content,
      term,
    })

    const longUrlWithUtm = utmString ? `${long}?${utmString}` : long

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_GRAVITY_URL}/api/v1/shortcut`,
        {
          headers: {
            "Content-Type": "application/json",
            "X-Access-Token": accessToken,
          },
          method: isEditContext ? "PUT" : "POST",
          body: JSON.stringify({
            short,
            long: longUrlWithUtm,
          }),
        }
      )

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
    short: short ? short : "",
    long: long ? long : "",
    showUtm: false,
    source: "",
    medium: "",
    campaignName: "",
    content: "",
    term: "",
  }

  return (
    <>
      <Formik
        initialValues={{
          ...initialValues,
        }}
        validationSchema={Yup.object({
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
                  title="Campaign Name"
                  name="campaignName"
                  type="text"
                  onChange={handleChange}
                  value={values.campaignName}
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
            {isEdit ? (
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
              // TODO: Make this better
              <>
                <StackableBorderBox>
                  <Text>{shortcutResponse.id}</Text>
                </StackableBorderBox>
                <StackableBorderBox>
                  <Text>{shortcutResponse.short}</Text>
                </StackableBorderBox>
                <StackableBorderBox>
                  <Text>{shortcutResponse.long}</Text>
                </StackableBorderBox>
              </>
            )}
          </Form>
        )}
      </Formik>
    </>
  )
}

const returnUTMString = (utmParams: Record<string, string>): string => {
  const result = []

  for (const key in utmParams) {
    if (utmParams[key]) result.push(`${key.toString()}=${utmParams[key]}`)
  }

  return result.join("&")
}
