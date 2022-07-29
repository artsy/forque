import { Box, Button, Spacer } from "@artsy/palette"
import { useRouter } from "next/router"
import { BatchUploadResult } from "pages/uploads/components/BatchUploadResult"
import { ChangeEvent, useCallback, useEffect, useState } from "react"
import styled from "styled-components"
import { Uploader } from "./Uploader"

export const UploadButton = () => {
  const [displayBatch, setDisplayBatch] = useState(false)

  const [files, setFiles] = useState<File[] | null>(null)

  const [uploadResults, setUploadResults] = useState<
    { key: string; status: "success" | "fail" }[]
  >([])

  const router = useRouter()

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return
    const fileList: File[] = Array.from(event.target.files)
    setFiles(fileList)
  }

  const handleUploadDone = useCallback(
    (key: string, status: "success" | "fail") => {
      setUploadResults((prevState) => [...prevState, { key, status }])
    },
    [setUploadResults]
  )

  useEffect(() => {
    if (files?.length === uploadResults?.length && files?.length === 1) {
      router.push(`/uploads/${encodeURIComponent(uploadResults[0].key)}`)
    } else if (files?.length === uploadResults?.length && files?.length > 1) {
      setDisplayBatch(true)
    }
  }, [files, router, uploadResults])

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

      <Spacer mt={4} />

      {displayBatch && <BatchUploadResult results={uploadResults} />}
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
