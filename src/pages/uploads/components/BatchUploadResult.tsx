import { Box, CheckCircleIcon, Spacer, Text, XCircleIcon } from "@artsy/palette"
import Link from "next/link"
import { FC } from "react"

interface BatchResultProps {
  results: { key: string; status: "success" | "fail" }[]
}

export const BatchUploadResult: FC<BatchResultProps> = ({ results }) => {
  return (
    <>
      <Spacer mt={4} />

      {results.map((result, i) => (
        <Box
          key={i}
          display="flex"
          flexDirection="row"
          mt={2}
          alignItems="center"
          justifyContent="space-between"
        >
          {result.status === "success" ? (
            <>
              <Link href={`/uploads/${encodeURIComponent(result.key)}`}>
                {result.key}
              </Link>
              <CheckCircleIcon />
            </>
          ) : (
            <>
              <Text>{result.key}</Text>
              <XCircleIcon />
            </>
          )}
        </Box>
      ))}
    </>
  )
}
