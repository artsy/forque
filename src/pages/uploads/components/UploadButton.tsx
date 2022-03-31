import { Box, Button, Spacer } from "@artsy/palette"
import { ChangeEvent, useState } from "react"
import styled from "styled-components"
import { Uploader } from "./Uploader"

export const UploadButton = () => {
  const [file, setFile] = useState<File | null>(null)

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.currentTarget.files?.[0]
    if (!file) return
    setFile(file)
  }

  return (
    <>
      <Box position="relative">
        <FileInput id="file" type="file" onChange={handleChange} />

        <Button
          // @ts-ignore
          as="label"
          htmlFor="file"
          width="100%"
        >
          Select a File
        </Button>
      </Box>

      {file && (
        <>
          <Spacer mt={4} />

          <Uploader file={file} />
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
