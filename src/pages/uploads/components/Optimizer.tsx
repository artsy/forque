/* eslint-disable @next/next/no-img-element */
import {
  Box,
  Column,
  GridColumns,
  Input,
  Radio,
  RadioGroup,
  ResponsiveBox,
  Spacer,
  Text,
} from "@artsy/palette"
import { Formik } from "formik"
import { gemini, ResizeTo } from "../utils/gemini"
import { FC } from "react"
import { scale } from "proportional-scale"

interface OptimizerProps {
  src: string
  width: number
  height: number
  onUpdate: (src: string) => void
}

export const Optimizer: FC<OptimizerProps> = ({
  src,
  width,
  height,
  onUpdate,
}) => {
  return (
    <Formik
      initialValues={{ mode: "fit", width, height, quality: 80 }}
      onSubmit={() => {
        // Ignore
      }}
    >
      {({ values, handleChange, setFieldValue }) => {
        const scaled = scale({
          width,
          height,
          maxWidth: values.width,
          maxHeight: values.height,
        })

        const dimensions = values.mode === "fit" ? scaled : values

        const geminiUrl = gemini(src, {
          resizeTo: values.mode as ResizeTo,
          width: values.width,
          height: values.height,
          quality: values.quality,
        })

        onUpdate(geminiUrl)

        return (
          <Box>
            <GridColumns>
              <Column span={2}>
                <Text variant="xs" textTransform="uppercase" mb={1}>
                  Mode
                </Text>

                <RadioGroup
                  defaultValue={values.mode}
                  onSelect={(selected) => {
                    setFieldValue("mode", selected)
                  }}
                >
                  <Radio value="fit" label="Resize" mb={0.5} />
                  <Radio value="fill" label="Crop" />
                </RadioGroup>
              </Column>

              <Column span={4}>
                <Input
                  name="width"
                  title="Width"
                  value={values.width}
                  type="number"
                  onChange={handleChange}
                />
              </Column>

              <Column span={4}>
                <Input
                  name="height"
                  title="Height"
                  value={values.height}
                  type="number"
                  onChange={handleChange}
                />
              </Column>

              <Column span={2}>
                <Input
                  name="quality"
                  title="Quality"
                  placeholder="Quality"
                  value={values.quality}
                  type="number"
                  onChange={handleChange}
                />
              </Column>
            </GridColumns>

            <Spacer mt={4} />

            <Text variant="xs" textTransform="uppercase" mb={1}>
              Preview ({dimensions.width} × {dimensions.height})
            </Text>

            <ResponsiveBox
              aspectWidth={dimensions.width}
              aspectHeight={dimensions.height}
              maxWidth={dimensions.width}
              bg="black10"
            >
              <img
                key={geminiUrl}
                src={geminiUrl}
                alt="Optimized image"
                width="100%"
                height="100%"
              />
            </ResponsiveBox>
          </Box>
        )
      }}
    </Formik>
  )
}
