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
import { filesize } from "./utils/filesize"
import Head from "next/head"
import { useRouter } from "next/router"
import { FC, SyntheticEvent, useState } from "react"
import useSWR from "swr"
import { Optimizer } from "./components/Optimizer"

const UploadPage: FC = () => {
  const router = useRouter()

  const { data } = useSWR<HeadObjectOutput>(
    { url: `/api/uploads/${encodeURIComponent(router.query.key as string)}` },
    fetcher
  )

  const url = `https://files.artsy.net/${router.query.key}`

  const [[width, height], setDimensions] = useState([0, 0])

  const handleLoad = ({
    currentTarget: { naturalWidth, naturalHeight },
  }: SyntheticEvent<HTMLImageElement, Event>) => {
    setDimensions([naturalWidth, naturalHeight])
  }

  const [optimize, setOptimize] = useState(false)

  const [optimizedUrl, setOptimizedUrl] = useState(url)

  const { copied, handleCopy } = useClipboard({ text: optimizedUrl })

  const handleClick = () => {
    setOptimize(true)
  }

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

          {optimize ? (
            <Optimizer
              src={url}
              width={width}
              height={height}
              onUpdate={(url) => setOptimizedUrl(url)}
            />
          ) : (
            <>
              <Text variant="xs" textTransform="uppercase" mb={0.5}>
                Preview
                {width && height && ` (${width} × ${height})`}
              </Text>

              <img src={url} alt="" onLoad={handleLoad} />

              <Button
                mt={1}
                variant="secondaryOutline"
                disabled={width === 0 || height === 0}
                onClick={handleClick}
                size="small"
              >
                Optimize / Resize
              </Button>
            </>
          )}
        </>
      )}

      <Spacer mt={4} />

      <Input title="Shareable URL" value={optimizedUrl} readOnly />

      <Button
        mt={1}
        onClick={handleCopy}
        disabled={copied}
        variant="secondaryOutline"
      >
        {copied ? "Copied to Clipboard" : "Copy to Clipboard"}
      </Button>

      {!optimize && (
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
      )}
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
