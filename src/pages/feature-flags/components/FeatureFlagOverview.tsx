import { Box, Text, Spacer, Button, BoxProps } from "@artsy/palette"
import { FeatureFlagsTable$data } from "__generated__/FeatureFlagsTable.graphql"

interface FeatureFlagOverview extends BoxProps {
  values: FeatureFlagsTable$data
}

const FeatureFlagOverview: React.FC<FeatureFlagOverview> = ({
  values,
  ...rest
}) => {
  return (
    <Box border="1px solid" borderColor="black10" p={2} {...rest}>
      <Text variant="md" fontWeight="bold">
        View on Unleash
      </Text>

      <Spacer my={2} />

      <Button
        // @ts-ignore
        as="a"
        size="small"
        variant="secondaryOutline"
        href={`https://unleash.artsy.net/projects/default/features/${values.name}/overview`}
        target="_blank"
        mr={1}
      >
        Overview
      </Button>

      <Button
        // @ts-ignore
        as="a"
        size="small"
        variant="secondaryOutline"
        href={`https://unleash.artsy.net/projects/default/features/${values.name}/metrics`}
        target="_blank"
        mr={1}
      >
        Metrics
      </Button>

      {values.type === "EXPERIMENT" ? (
        <Button
          // @ts-ignore
          as="a"
          size="small"
          variant="secondaryOutline"
          href={`https://unleash.artsy.net/projects/default/features/${values.name}/variants`}
          target="_blank"
        >
          Edit Variants
        </Button>
      ) : (
        <Button
          // @ts-ignore
          as="a"
          size="small"
          variant="secondaryOutline"
          href={`https://unleash.artsy.net/projects/default/features/${values.name}/edit`}
          target="_blank"
        >
          Edit
        </Button>
      )}
    </Box>
  )
}

export default FeatureFlagOverview
