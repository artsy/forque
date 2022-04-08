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
import { FC, useState } from "react"
import { validateEmail } from "utils/validateEmail"
import { useTransferMyCollection } from "../mutations/useTransferMyCollection"
import { UserCard } from "./UserCard"

export const MyCollectionTransfer: FC = () => {
  const { sendToast } = useToasts()
  const { submitMutation } = useTransferMyCollection()

  const [emailFrom, setEmailFrom] = useState("")
  const [emailTo, setEmailTo] = useState("")

  const [showDialog, setShowDialog] = useState(false)
  const [loading, setLoading] = useState(false)

  const transferMyCollection = async () => {
    setLoading(true)

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
        message: `Transfering artworks failed: ${error}`,
        variant: "error",
      })

      console.error("[forque] Error transfaring My Collection artworks:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Text variant="xl" mb={1}>
        Transfer My Collection Artworks
      </Text>
      <Text mb={4}>
        {`Transfer artwork from one user's collection to another user's collection.`}
      </Text>
      <GridColumns>
        <Column span={5} minHeight={[0, 300]}>
          <Input
            title="From"
            placeholder="Please enter an email address"
            onChange={(e) => setEmailFrom(e.target.value)}
          />
          {!!emailFrom.length && <UserCard email={emailFrom} />}
        </Column>
        <Column span={2}>
          <Flex justifyContent="center" height="100%" my="1">
            <ArrowRightIcon m="auto" />
          </Flex>
        </Column>
        <Column span={5} minHeight={[0, 300]}>
          <Input
            title="To"
            placeholder="Please enter an email address"
            onChange={(e) => setEmailTo(e.target.value)}
          />
          {!!emailTo.length && <UserCard email={emailTo} />}
        </Column>
        <Column span={12}>
          <Button
            onClick={() => setShowDialog(true)}
            width="100%"
            size="medium"
            loading={loading}
            disabled={!validateEmail(emailFrom) || !validateEmail(emailTo)}
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
                transferMyCollection()
                setShowDialog(false)
              }}
            >
              Transfer Artworks
            </Button>
          }
        >
          <Text variant="sm">{`Are you sure you want to transfer all My Collection artworks from "${emailFrom}" to "${emailTo}"?`}</Text>
        </ModalDialog>
      )}
    </>
  )
}
