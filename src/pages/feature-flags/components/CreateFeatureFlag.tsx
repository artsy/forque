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
        experiment: false,
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
                // variants: values.variants,
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

            <Checkbox
              onSelect={(selected) => {
                setFieldValue("experiment", selected)
              }}
              selected={values.experiment}
            >
              Experiment
            </Checkbox>

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
