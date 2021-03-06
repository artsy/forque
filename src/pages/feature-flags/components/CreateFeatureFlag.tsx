import {
  Text,
  Box,
  Button,
  Checkbox,
  Input,
  Radio,
  RadioGroup,
  Spacer,
  Message,
  Separator,
  useToasts,
} from "@artsy/palette"
import { JSONLog } from "components/JSONLog"
import { Form, Formik } from "formik"
import { useRouter } from "next/router"
import { useRef, useState } from "react"
import * as Yup from "yup"
import { useCreateFeatureFlagMutation$variables } from "__generated__/useCreateFeatureFlagMutation.graphql"
import { useCreateFeatureFlag } from "../mutations/useCreateFeatureFlag"

interface InputTypes {
  name: string
  strategy: {
    strategyType: "DEFAULT" | "FLEXIBLE_ROLLOUT"
    rollOut: number
  }
  type: "EXPERIMENT" | "RELEASE"
  experiment: {
    isExperiment: boolean
    variants: Array<{
      name: string
      weight: number
      weightType: "VARIABLE"
    }>
  }
}

const CreateFeatureFlag: React.FC = () => {
  const submitData = useRef<useCreateFeatureFlagMutation$variables | null>(null)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const router = useRouter()
  const { submitMutation } = useCreateFeatureFlag()
  const { sendToast } = useToasts()

  return (
    <Formik<InputTypes>
      initialValues={{
        name: "",
        strategy: {
          strategyType: "DEFAULT",
          rollOut: 100,
        },
        type: "RELEASE",
        experiment: {
          isExperiment: false,
          variants: [
            {
              name: "control",
              weight: 0,
              weightType: "VARIABLE",
            },
            {
              name: "expriment",
              weight: 0,
              weightType: "VARIABLE",
            },
          ],
        },
      }}
      validationSchema={Yup.object().shape({
        name: Yup.string().required("A name is required"),
      })}
      onSubmit={async (values) => {
        try {
          // Unleash API doesn't like empty whitespace in strings. Trim it.
          const cleanData = JSON.parse(
            JSON.stringify(submitData.current).replace(/"\s+|\s+"/g, '"')
          )

          await submitMutation({
            variables: cleanData,
          })

          sendToast({
            message: `Successfully created ${values.name}.`,
            variant: "success",
          })

          router.push("/feature-flags")
        } catch (error: any) {
          const errorMessage = JSON.parse(error[0].message)
          console.error("[forque] Error creating feature flag", errorMessage)

          setSubmitError(errorMessage)

          sendToast({
            message: `Error creating feature flag`,
            variant: "error",
          })
        }
      }}
    >
      {({
        isSubmitting,
        isValid,
        values,
        touched,
        errors,
        handleChange,
        handleBlur,
        setFieldValue,
      }) => {
        // Storing in a ref so that we can log current values to the screen
        submitData.current = {
          input: {
            name: values.name,
            type: values.experiment.isExperiment ? "EXPERIMENT" : "RELEASE",
            strategy: {
              strategyType: values.strategy.strategyType,
              rollOut: values.strategy.rollOut,
            },
            variants: values.experiment.isExperiment
              ? values.experiment.variants
              : null,
          },
        }

        const handleAddAdditionalVariant = () => {
          setFieldValue("experiment.variants", [
            ...values.experiment.variants,
            { name: "", weight: 0, weightType: "VARIABLE" },
          ])
        }

        return (
          <Form>
            <Input
              name="name"
              title="Name"
              placeholder="Enter name"
              value={values.name}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.name && (errors.name as any)}
            />

            <Spacer my={2} />

            <Box>
              <Text variant="sm">Strategy</Text>
              <RadioGroup
                defaultValue="DEFAULT"
                onSelect={(selectionOption) => {
                  setFieldValue("strategy.strategyType", selectionOption)
                }}
              >
                <Radio value="DEFAULT" label="Simple on/off flag" my={0.5} />
                <Radio
                  value="FLEXIBLE_ROLLOUT"
                  label="Flexible Roll-out. Enable flag for a percentage of users"
                />
              </RadioGroup>

              {values.strategy.strategyType === "FLEXIBLE_ROLLOUT" && (
                <Input
                  my={1}
                  name="strategy.rollOut"
                  title="Rollout Percentage"
                  placeholder="100"
                  type="number"
                  value={values.strategy.rollOut}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={
                    touched?.strategy &&
                    ((errors?.strategy as any)?.rollOut as any)
                  }
                />
              )}
            </Box>

            <Spacer my={2} />

            <Box>
              <Checkbox
                onSelect={(selected) => {
                  setFieldValue("experiment.isExperiment", selected)
                }}
                selected={values.experiment.isExperiment}
              >
                Experiment
              </Checkbox>

              {values.experiment.isExperiment && (
                <>
                  {values.experiment.variants.map(
                    (variant: any, index: number) => {
                      return (
                        <Box
                          border="1px solid"
                          borderColor="black10"
                          key={index}
                          p={2}
                          my={1}
                        >
                          <Input
                            my={1}
                            name={`experiment.variants.${index}.name`}
                            title="Variant Name"
                            placeholder="Variant Name"
                            value={values.experiment.variants[index].name}
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                          <Input
                            my={1}
                            name={`experiment.variants.${index}.weight`}
                            title="Variant Weight"
                            placeholder="Variant Name"
                            value={values.experiment.variants[index].weight}
                            type="number"
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                        </Box>
                      )
                    }
                  )}

                  <Button
                    size="small"
                    onClick={(event) => {
                      event.stopPropagation()
                      event.preventDefault()

                      handleAddAdditionalVariant()
                    }}
                  >
                    Add Additional Variant
                  </Button>
                </>
              )}
            </Box>

            <Separator my={2} />

            <Button
              loading={
                // FIXME: Fix this in palette
                isSubmitting ? ("true" as unknown as boolean) : undefined
              }
              disabled={!isValid}
              type="submit"
            >
              Create
            </Button>

            {submitError && (
              <Message
                variant="error"
                title="Error creating feature flag"
                mt={2}
              >
                <JSONLog>{submitError}</JSONLog>
              </Message>
            )}

            <Message variant="info" title="Submit Data" mt={4}>
              <JSONLog>{submitData.current}</JSONLog>
            </Message>
          </Form>
        )
      }}
    </Formik>
  )
}

export default CreateFeatureFlag
