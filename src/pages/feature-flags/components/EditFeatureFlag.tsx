import {
  Box,
  BoxProps,
  Button,
  Checkbox,
  Flex,
  Input,
  Join,
  Spacer,
} from "@artsy/palette"
import { Form, Formik } from "formik"
import { Row } from "react-table"
import * as Yup from "yup"
import { useDeleteFeatureFlag } from "../mutations/useDeleteFeatureFlag"
import { useUpdateFeatureFlag } from "../mutations/useUpdateFeatureFlag"

interface EditFeatureFlagProps extends Partial<Row>, BoxProps {
  [key: string]: any
}

const EditFeatureFlag: React.FC<EditFeatureFlagProps> = ({ row, ...rest }) => {
  const { submitMutation: updateFeatureFlag } = useUpdateFeatureFlag()
  const { submitMutation: deleteFeatureFlag } = useDeleteFeatureFlag()

  const handleDelete = async () => {
    try {
      await deleteFeatureFlag({
        variables: {
          input: {
            name: row.values.name,
          },
        },
      })
    } catch (error) {
      console.error("[forque] Error deleting feature flag", error)
    }
  }

  return (
    <Box {...rest}>
      <Formik<any>
        initialValues={{
          name: row.values.name,
          enabled: row.values.enabled,
        }}
        validationSchema={Yup.object().shape({
          name: Yup.string().required("A name is required"),
        })}
        onSubmit={async (values) => {
          try {
            await updateFeatureFlag({
              variables: {
                input: values,
              },
            })
          } catch (error) {
            console.error("[forque] Error updating feature flag:", error)
          }
        }}
      >
        {({
          // isSubmitting,
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
              <Box border="1px solid" borderColor="black10" p={2}>
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

                  <Flex>
                    <Button disabled={!isValid} type="submit" size="small">
                      Update
                    </Button>

                    <Button
                      disabled={!isValid}
                      variant="secondaryOutline"
                      size="small"
                      onClick={handleDelete}
                    >
                      Delete
                    </Button>
                  </Flex>
                </Join>
              </Box>
            </Form>
          )
        }}
      </Formik>
    </Box>
  )
}

export default EditFeatureFlag
