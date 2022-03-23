import { Box, Text } from "@artsy/palette"

function Page() {
  return (
    <Box>
      <Text as="h1" variant="xxl" my={2}>
        Hello, Palette
      </Text>

      <Text as="p" variant="text" my={2}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas, quam
        sint? Doloribus illo ullam deleniti quidem, placeat tempore ipsa in
        ducimus inventore sit modi, maxime tempora non cumque fuga iste.
      </Text>

      <Text as="p" variant="text" my={2} p={2} bg="red10" color="red100">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas, quam
        sint? Doloribus illo ullam deleniti quidem, placeat tempore ipsa in
        ducimus inventore sit modi, maxime tempora non cumque fuga iste.
      </Text>
    </Box>
  )
}

export default Page
