import { useState } from "react"

interface UseClipboard {
  text: string
}

export const useClipboard = ({ text }: UseClipboard) => {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(text)

    setCopied(true)

    setTimeout(() => {
      setCopied(false)
    }, 2000)
  }

  return { copied, handleCopy }
}
