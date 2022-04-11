import {
  ArrowRightIcon,
  Button,
  Column,
  Flex,
  GridColumns,
  Input,
  ModalDialog,
  Text,
  useToasts,
} from "@artsy/palette"
import { Form, Formik } from "formik"
import { FC, useState } from "react"
import * as Yup from "yup"
import { useTransferMyCollection } from "../mutations/useTransferMyCollection"
import { UserCard } from "./UserCard"

export const MyCollectionTransfer: FC = () => {
  const { sendToast } = useToasts()
  const { submitMutation } = useTransferMyCollection()

  const [showDialog, setShowDialog] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const transferMyCollection = async (emailFrom: string, emailTo: string) => {
    setIsLoading(true)

    try {
      const result = await submitMutation({
        variables: {
          input: {
            emailFrom,
            emailTo,
          },
        },
      })

      const data = result.transferMyCollection?.artworkCountOrError

      if (data?.errors?.length) throw new Error(data?.errors[0].message)

      sendToast({
        message: `Successfully transfered ${data?.count} artworks.`,
        variant: "success",
      })
    } catch (error) {
      sendToast({
        message: `Transfering artworks failed: ${JSON.stringify(error)}`,
        variant: "error",
      })

      console.error("[forque] Error transfaring My Collection artworks:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Formik
      initialValues={{ emailFrom: "", emailTo: "" }}
      onSubmit={() => {
        setShowDialog(true)
      }}
      validationSchema={Yup.object({
        emailFrom: Yup.string().email(),
        emailTo: Yup.string().email(),
      })}
    >
      {({ values, handleChange }) => (
        <Form>
          <Text variant="xl" mb={1}>
            Transfer My Collection Artworks
          </Text>
          <Text variant="subtitle" mb={4}>
            {`Transfer artwork from one user's collection to another user's collection.`}
          </Text>

          <GridColumns>
            <Column span={5} minHeight={[0, 300]}>
              <Input
                name="emailFrom"
                type="email"
                title="From"
                placeholder="Please enter an email address"
                value={values.emailFrom}
                onChange={handleChange}
                data-testid="transfer-my-collection-from-input"
              />
              {!!values.emailFrom.length && (
                <UserCard email={values.emailFrom} />
              )}
            </Column>
            <Column span={2}>
              <Flex justifyContent="center" height="100%" my="1">
                <ArrowRightIcon m="auto" />
              </Flex>
            </Column>
            <Column span={5} minHeight={[0, 300]}>
              <Input
                name="emailTo"
                type="email"
                title="To"
                placeholder="Please enter an email address"
                value={values.emailTo}
                onChange={handleChange}
                data-testid="transfer-my-collection-to-input"
              />
              {!!values.emailTo.length && <UserCard email={values.emailTo} />}
            </Column>
            <Column span={12}>
              <Button
                type="submit"
                width="100%"
                size="medium"
                loading={isLoading}
              >
                Transfer Artworks
              </Button>
            </Column>
          </GridColumns>

          {showDialog && (
            <ModalDialog
              title="Transfer Artworks"
              width={["100%", 600]}
              onClose={() => setShowDialog(false)}
              footer={
                <Button
                  width="100%"
                  onClick={() => {
                    transferMyCollection(values.emailFrom, values.emailTo)
                    setShowDialog(false)
                  }}
                >
                  Transfer Artworks
                </Button>
              }
            >
              <Text variant="sm">{`Are you sure you want to transfer all My Collection artworks from "${values.emailFrom}" to "${values.emailTo}"?`}</Text>
            </ModalDialog>
          )}
        </Form>
      )}
    </Formik>
  )
}
