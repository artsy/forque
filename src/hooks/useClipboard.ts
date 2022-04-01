import { useToasts } from "@artsy/palette"
import { useState } from "react"

interface UseClipboard {
  value: string
}

export const useClipboard = ({ value }: UseClipboard) => {
  const [copied, setCopied] = useState(false)

  const { sendToast } = useToasts()

  const handleCopy = () => {
    navigator.clipboard.writeText(value)

    setCopied(true)

    sendToast({ message: "Copied to clipboard", variant: "alert" })

    setTimeout(() => {
      setCopied(false)
    }, 2000)
  }

  return { copied, handleCopy }
}
