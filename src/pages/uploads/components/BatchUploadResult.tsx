import { Box, CheckCircleIcon, Text, XCircleIcon } from "@artsy/palette"
import { FC } from "react"

interface BatchResultProps {
  results: { key: string; status: "success" | "fail" }[]
}

export const BatchUploadResult: FC<BatchResultProps> = ({ results }) => {
  return (
    <>
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
              <a
                href={`/uploads/${encodeURIComponent(result.key)}`}
                target="_blank noreferrer"
              >
                {result.key}
              </a>
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
