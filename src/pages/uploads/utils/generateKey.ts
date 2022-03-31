const TYPE_CATEGORIZATION = {
  image: "images",
  text: "documents",
  video: "videos",
} as const

const SUBTYPE_CATEGORIZATION = {
  pdf: "documents",
} as const

const FALLBACK_CATEGORIZATION = "other"

export const generateKey = ({
  contentType,
  name,
}: {
  contentType: string
  name: string
}) => {
  const [type, subType] = contentType.split("/")

  const typeCategory =
    TYPE_CATEGORIZATION[type as keyof typeof TYPE_CATEGORIZATION]

  const subtypeCategory =
    SUBTYPE_CATEGORIZATION[subType as keyof typeof SUBTYPE_CATEGORIZATION]

  return [
    subtypeCategory ?? typeCategory ?? FALLBACK_CATEGORIZATION,
    name,
  ].join("/")
}
