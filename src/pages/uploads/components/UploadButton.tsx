import { Box, Button, Spacer } from "@artsy/palette"
import { ChangeEvent, useState } from "react"
import styled from "styled-components"
import { Uploader } from "./Uploader"

export const UploadButton = () => {
  const [files, setFiles] = useState<File[] | null>(null)

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return
    const fileList: File[] = Array.from(event.target.files)
    if (fileList.length <= 0) return
    setFiles(fileList)
  }

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

      {files && (
        <>
          <Spacer mt={4} />

          {files.map((file, i) => (
            <Uploader key={i} file={file} />
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
