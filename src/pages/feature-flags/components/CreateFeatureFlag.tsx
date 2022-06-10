import { Button, Checkbox, Input, Join, Spacer } from "@artsy/palette"
import { Form, Formik } from "formik"
import Yup from "yup"
import { useCreateFeatureFlag } from "../mutations/useCreateFeatureFlag"

const CreateFeatureFlag: React.FC = () => {
  const { submitMutation } = useCreateFeatureFlag()

  return (
    <Formik<any>
      initialValues={{
        name: "",
        enabled: false,
      }}
      validationSchema={Yup.object().shape({
        name: Yup.string().required("A name is required"),
      })}
      onSubmit={async (values) => {
        try {
          await submitMutation({
            variables: {
              input: values,
            },
          })
          //
        } catch (error) {
          console.error("[forque] Error creating feature flag", error)
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
            <Join separator={<Spacer my={2} />}>
              <Input
                name="name"
                title="Name"
                placeholder="Enter name"
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.name && (errors.name as any)}
                autoFocus
              />

              <Checkbox
                onSelect={(selected) => {
                  setFieldValue("enabled", selected)
                }}
                selected={values.enabled}
              >
                Enabled
              </Checkbox>

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
            </Join>
          </Form>
        )
      }}
    </Formik>
  )
}

export default CreateFeatureFlag
