import {
  Text,
  Box,
  Button,
  Checkbox,
  Input,
  Radio,
  RadioGroup,
  Spacer,
} from "@artsy/palette"
import { Form, Formik } from "formik"
import { useRouter } from "next/router"
import * as Yup from "yup"
import { useCreateFeatureFlag } from "../mutations/useCreateFeatureFlag"

const CreateFeatureFlag: React.FC = () => {
  const router = useRouter()
  const { submitMutation } = useCreateFeatureFlag()

  return (
    <Formik<any>
      initialValues={{
        name: "",
        strategy: {
          strategyType: "DEFAULT",
          rollOut: 100,
        },
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
          await submitMutation({
            variables: {
              input: {
                name: values.name,
                type: values.experiment ? "EXPERIMENT" : "RELEASE",
                strategy: {
                  strategyType: values.strategy.strategyType,
                  rollOut: values.strategy.rollout,
                },
                variants: values.variants,
              },
            },
          })

          setTimeout(() => {
            router.push("/feature-flags")
          }, 1000)
        } catch (error: any) {
          console.error(
            "[forque] Error creating feature flag",
            JSON.parse(error.message)
          )
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
        const handleAddAdditionalVariant = () => {
          setFieldValue("experiment.variants", [
            ...values.experiment.variants,
            { name: "", weight: 500, weightType: "VARIABLE" },
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
                  label="Flexible Roll-out. For A/B tests, where you can specify a percentage of users to be served a variant"
                />
              </RadioGroup>

              {values.strategy.strategyType === "FLEXIBLE_ROLLOUT" && (
                <Input
                  my={1}
                  name="strategy.rollout"
                  title="Rollout Percentage"
                  placeholder="100"
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
                  setFieldValue("experiment.isEnabled", selected)
                }}
                selected={values.experiment.isEnabled}
              >
                Experiment
              </Checkbox>

              {values.experiment.isEnabled && (
                <>
                  {values.experiment.variants.map((variant, index) => {
                    return (
                      <Box border="1px solid #ccc" key={index} p={2} my={1}>
                        <Input
                          my={1}
                          name={`experiment.variants.${index}.name`}
                          title="Variant Name"
                          placeholder="Variant Name"
                          value={values.experiment.variants[index].name}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={
                            touched?.experiment?.variants?.[index]?.name &&
                            errors.experiment?.variants?.[index]?.name
                          }
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
                          error={
                            touched?.experiment?.variants?.[index]?.weight &&
                            errors.experiment?.variants?.[index]?.weight
                          }
                        />
                      </Box>
                    )
                  })}

                  <Button size="small" onClick={handleAddAdditionalVariant}>
                    Add Additional Variant
                  </Button>
                </>
              )}
            </Box>

            <Spacer my={2} />

            <Button
              loading={
                // FIXME: Fix this in palette
                isSubmitting ? ("true" as unknown as boolean) : undefined
              }
              disabled={!isValid}
              type="submit"
              size="small"
            >
              Create
            </Button>
          </Form>
        )
      }}
    </Formik>
  )
}

export default CreateFeatureFlag
