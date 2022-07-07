import {
  AutocompleteInputOptionLabelProps,
  Box,
  Flex,
  Text,
  VerifiedIcon,
} from "@artsy/palette"

export interface Props extends AutocompleteInputOptionLabelProps {
  email: string
  isIdentityVerified: boolean
}

export const UserAutocompleteOption: React.FC<Props> = (props) => {
  const { email, isIdentityVerified, text } = props

  return (
    <Flex alignItems="center" p={1}>
      <Box flex={1}>
        <Text as="span" overflowEllipsis fontWeight={"bold"} pr={1}>
          {text}
        </Text>

        <Text
          as="span"
          overflowEllipsis
          textColor="black60"
          position="relative"
        >
          {email}
          {isIdentityVerified && (
            <span
              data-testid="identity-verified-badge"
              style={{ position: "relative" }}
            >
              <Box position="absolute" top="0" left="0.25em">
                <VerifiedIcon fill="green100" height={20} width={20} />
              </Box>
            </span>
          )}
        </Text>
      </Box>
    </Flex>
  )
}
