interface UtmParamsKeyType {
  [key: string]: string
}

interface UtmParams extends UtmParamsKeyType {
  source: string
  medium: string
  campaign: string
  content: string
  term: string
}

export const returnUTMString = (utmParams: UtmParams): string => {
  const result = []

  for (const key in utmParams) {
    if (utmParams[key]) result.push(`utm_${key.toString()}=${utmParams[key]}`)
  }

  return result.join("&")
}
