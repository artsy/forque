/* eslint-disable @next/next/no-img-element */
import {
  Button,
  Input,
  Skeleton,
  SkeletonText,
  Spacer,
  Text,
} from "@artsy/palette"
import { HeadObjectOutput } from "aws-sdk/clients/s3"
import { useClipboard } from "hooks/useClipboard"
import { filesize } from "lib/filesize"
import Head from "next/head"
import { useRouter } from "next/router"
import { FC } from "react"
import useSWR from "swr"

const UploadPage: FC = () => {
  const router = useRouter()

  const { data } = useSWR<HeadObjectOutput>(
    { url: `/api/uploads/${encodeURIComponent(router.query.key as string)}` },
    fetcher
  )

  const url = `https://files.artsy.net/${router.query.key}`

  const { copied, handleCopy } = useClipboard({ text: url })

  if (!data) {
    return (
      <Skeleton>
        <SkeletonText variant="lg">Editing example/key.jpg</SkeletonText>

        <SkeletonText variant="lg">
          Last Modified: 000-00-00T00:00:00.000Z
        </SkeletonText>

        <SkeletonText variant="lg">binary/octet-stream</SkeletonText>

        <SkeletonText variant="lg">0.0kb</SkeletonText>
      </Skeleton>
    )
  }

  return (
    <>
      <Head>
        <title>{router.query.key} | Uploads | Artsy</title>
      </Head>

      <Text variant="lg">Editing {router.query.key}</Text>

      {data.LastModified && (
        <Text variant="lg" color="black60">
          Last Modified: {data.LastModified}
        </Text>
      )}

      {data.ContentType && (
        <Text variant="lg" color="black60">
          {data.ContentType}
        </Text>
      )}

      {(data.ContentLength ?? 0) > 0 && (
        <Text variant="lg" color="black60">
          {filesize(data.ContentLength ?? 0)}
        </Text>
      )}

      {data.ContentType?.includes("image/") && (
        <>
          <Spacer mt={4} />

          <Text variant="xs" textTransform="uppercase" mb={0.5}>
            Preview
          </Text>

          <img src={url} alt="" style={{ maxWidth: "75%" }} />

          <Button
            mt={1}
            variant="secondaryOutline"
            onClick={() => alert("TODO")}
          >
            Optimize / Resize
          </Button>
        </>
      )}

      <Spacer mt={4} />

      <Input title="Shareable URL" value={url} readOnly />

      <Button
        mt={1}
        onClick={handleCopy}
        disabled={copied}
        variant="secondaryOutline"
      >
        {copied ? "Copied to Clipboard" : "Copy to Clipboard"}
      </Button>

      <Button
        // @ts-ignore
        as="a"
        href={url}
        target="_blank"
        ml={1}
        variant="secondaryGray"
      >
        Open in New Tab
      </Button>
    </>
  )
}

// HACK:
export const getServerSideProps = () => ({ props: {} })

export default UploadPage

const fetcher = async ({ url }: { url: string }) => {
  const response = await fetch(url)

  if (!response.ok) {
    throw new Error(response.statusText || response.status.toString())
  }

  return await response.json()
}
