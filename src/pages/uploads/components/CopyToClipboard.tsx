import { Button, Input, TextArea } from "@artsy/palette"
import { useClipboard } from "hooks"
import { FC } from "react"

interface CopyToClipboardProps {
  title: string
  value: string
}

export const CopyToClipboard: FC<CopyToClipboardProps> = ({ title, value }) => {
  const { copied, handleCopy } = useClipboard({ value })

  const Component = value.length > 200 ? TextArea : Input

  return (
    <>
      <Component title={title} value={value} readOnly />

      <Button
        mt={1}
        onClick={handleCopy}
        disabled={copied}
        variant="secondaryOutline"
      >
        {copied ? "Copied to Clipboard" : "Copy to Clipboard"}
      </Button>
    </>
  )
}
