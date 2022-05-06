import { FC, useEffect, useRef, useState } from "react"
import useSWR from "swr"
import { ProgressBar, Text, useToasts } from "@artsy/palette"
import { uploadFile } from "../utils/uploadFile"
import { PresignedPost } from "aws-sdk/clients/s3"
import { generateKey } from "../utils/generateKey"
import { useRouter } from "next/router"

interface UploaderProps {
  file: File
}

export const Uploader: FC<UploaderProps> = ({ file }) => {
  const key = generateKey({ name: file.name, contentType: file.type })

  const { sendToast } = useToasts()

  const [progress, setProgress] = useState(0)

  const router = useRouter()

  // HACK: Impose no cache for Uploader SWR call to address behavior where an
  //   existing file is overwritten when performing consecutive uploads using a
  //   new file with same name during the same browser session.
  //   Adopted from: https://github.com/vercel/swr/discussions/456#discussioncomment-25602
  const random = useRef(Date.now())

  const { data } = useSWR<PresignedPost>(
    [
      {
        url: `/api/uploads/presignedPosts/${encodeURIComponent(key)}`,
        args: { contentType: file.type },
      },
      random.current,
    ],
    fetcher
  )

  const uploading = useRef(false)

  useEffect(() => {
    if (uploading.current || !data) return

    uploading.current = true

    uploadFile({
      file,
      presignedPost: data,
      onFileDone: () => {
        router.push(`/uploads/${encodeURIComponent(data.fields.key)}`)

        sendToast({ variant: "success", message: "File uploaded" })
      },
      onFileError: (err) => {
        console.error(err)

        sendToast({ variant: "error", message: err.message })

        uploading.current = false
      },
      onFileProgress: (progress) => {
        setProgress(progress)
      },
    })
  }, [data, file, router, sendToast])

  if (!data)
    return (
      <Text variant="xs" color="black60">
        Loading
      </Text>
    )

  return (
    <>
      <ProgressBar percentComplete={progress} />

      <Text variant="xs" color="black60" mt={1}>
        Uploading {key} ({progress}%)
      </Text>
    </>
  )
}

const fetcher = async ({
  url,
  args,
}: {
  url: string
  args: { contentType: string }
}) => {
  const response = await fetch([url, new URLSearchParams(args)].join("?"))

  if (!response.ok) {
    throw new Error(response.statusText || response.status.toString())
  }

  return await response.json()
}
