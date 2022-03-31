import { identity, pickBy } from "lodash"

const GEMINI_URL = "https://d7hftxdivxxvm.cloudfront.net"

export type ResizeTo = "width" | "height" | "fit" | "fill"

export const gemini = (
  src: string,
  {
    convertTo,
    height,
    quality,
    resizeTo,
    width,
  }: {
    convertTo?: string
    height?: number
    quality?: number
    resizeTo: ResizeTo
    width?: number
  }
) => {
  const options = {
    convert_to: convertTo,
    height,
    quality,
    resize_to: resizeTo as string,
    src,
    width,
  }

  return [
    GEMINI_URL,
    new URLSearchParams(pickBy(options, identity) as any),
  ].join("?")
}
