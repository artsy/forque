import { Box, Button, Spacer } from "@artsy/palette"
import Link from "next/link"
import { useRouter } from "next/router"
import { ChangeEvent, useCallback, useEffect, useState } from "react"
import styled from "styled-components"
import { Uploader } from "./Uploader"

export const UploadButton = () => {
  const [displayBatch, setDisplayBatch] = useState(false)

  const [files, setFiles] = useState<File[] | null>(null)

  const [uploads, setUploads] = useState<{ key: string; complete: boolean }[]>(
    []
  )

  const router = useRouter()

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return
    const fileList: File[] = Array.from(event.target.files)
    setFiles(fileList)
  }

  const handleUploadDone = useCallback(
    (key: string) => {
      setUploads((prevState) => [...prevState, { key, complete: true }])
    },
    [setUploads]
  )

  useEffect(() => {
    if (files?.length === uploads?.length && files?.length === 1) {
      router.push(`/uploads/${encodeURIComponent(uploads[0].key)}`)
    } else if (files?.length === uploads?.length && files?.length > 1) {
      setDisplayBatch(true)
    }
  }, [files, router, uploads])

  return (
    <>
      <Box position="relative">
        <FileInput id="file" type="file" onChange={handleChange} multiple />

        <Button
          // @ts-ignore
          as="label"
          htmlFor="file"
          width="100%"
        >
          Select a File
        </Button>
      </Box>

      {files && !displayBatch && (
        <>
          <Spacer mt={4} />

          {files.map((file, i) => (
            <Uploader key={i} file={file} onUploadDone={handleUploadDone} />
          ))}
        </>
      )}

      {displayBatch && (
        <>
          <Spacer mt={4} />

          {uploads.map((upload, i) => (
            <>
              <Link key={i} href={`/uploads/${encodeURIComponent(upload.key)}`}>
                {upload.key}
              </Link>

              <Spacer mt={1} />
            </>
          ))}
        </>
      )}
    </>
  )
}

const FileInput = styled.input`
  width: 0.1px;
  height: 0.1px;
  opacity: 0;
  overflow: hidden;
  position: absolute;
  z-index: -1;
`
