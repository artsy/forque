import { AutocompleteInput, Column, GridColumns, Text } from "@artsy/palette"
import { ListObjectsV2Output } from "aws-sdk/clients/s3"
import { useSession } from "next-auth/react"
import Head from "next/head"
import { useRouter } from "next/router"
import { FC, useState } from "react"
import useSWR from "swr"
import { Action, assertPermitted, UserWithAccessToken } from "system"
import { UploadButton } from "./components/UploadButton"

const UploadsPage: FC = () => {
  const session = useSession()
  const user = session.data?.user as UserWithAccessToken
  assertPermitted(user, Action.create, "uploads")

  const router = useRouter()

  const [prefix, setPrefix] = useState("")

  const { data } = useSWR<ListObjectsV2Output>(
    () =>
      prefix.length > 0 ? { url: "/api/uploads", args: { prefix } } : null,
    fetcher
  )

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPrefix(event.target.value)
  }

  const handleSelect = ({ value }: { value: string }) => {
    router.push(`/uploads/${encodeURIComponent(value)}`)
  }

  const handleSubmit = (value: string) => {
    const key = value.replace(/http[s]*:\/\/files.artsy.net\//, "")
    router.push(`/uploads/${encodeURIComponent(key)}`)
  }

  return (
    <>
      <Head>
        <title>Uploads | Artsy</title>
      </Head>

      <GridColumns>
        <Column span={6}>
          <Text variant="xs" textTransform="uppercase" mb={0.5}>
            Add a New Upload
          </Text>

          <UploadButton />
        </Column>

        <Column span={6}>
          <AutocompleteInput
            title="Find an Existing Upload"
            onSelect={handleSelect}
            onChange={handleChange}
            onSubmit={handleSubmit}
            placeholder="Find by prefix or paste URL"
            loading={!data && prefix.length > 0}
            options={(data?.Contents || []).map((item) => ({
              text: item.Key!,
              value: item.Key!,
            }))}
          />
        </Column>
      </GridColumns>
    </>
  )
}

// HACK:
export const getServerSideProps = () => ({ props: {} })

export default UploadsPage

const fetcher = async ({
  url,
  args,
}: {
  url: string
  args: { prefix: string }
}) => {
  const response = await fetch(
    [url, new URLSearchParams({ Prefix: args.prefix })].join("?")
  )

  if (!response.ok) {
    throw new Error(response.statusText || response.status.toString())
  }

  return await response.json()
}
