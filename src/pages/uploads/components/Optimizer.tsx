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
import { CopyToClipboard } from "./CopyToClipboard"

interface OptimizerProps {
  src: string
  width: number
  height: number
}

export const Optimizer: FC<OptimizerProps> = ({ src, width, height }) => {
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

        const _1x = gemini(src, {
          resizeTo: values.mode as ResizeTo,
          width: values.width,
          height: values.height,
          quality: values.quality,
        })

        const _2x = gemini(src, {
          resizeTo: values.mode as ResizeTo,
          width: values.width * 2,
          height: values.height * 2,
          quality: values.quality,
        })

        const srcSet = `${_1x} 1x, ${_2x} 2x`

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
                key={_1x}
                src={_1x}
                srcSet={srcSet}
                alt="Optimized image"
                width="100%"
                height="100%"
              />
            </ResponsiveBox>

            <Spacer mt={4} />

            <CopyToClipboard
              title="Image Embed"
              value={`<img src="${_1x}" srcset="${srcSet}" alt="" width="${dimensions.width}" height="${dimensions.height}" />`}
            />

            <Spacer mt={4} />

            <CopyToClipboard title="1x URL" value={_1x} />

            <Spacer mt={4} />

            <CopyToClipboard title="2x URL" value={_2x} />
          </Box>
        )
      }}
    </Formik>
  )
}
