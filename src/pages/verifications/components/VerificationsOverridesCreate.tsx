import {
  Button,
  Column,
  GridColumns,
  Input,
  Select,
  useToasts,
} from "@artsy/palette"
import { Form, Formik } from "formik"
import { RefetchFnDynamic } from "react-relay"
import * as Yup from "yup"
import { useCreateIdentityVerificationOverride } from "../mutations/useCreateIdentityVerificationOverride"

interface VerificationsOverridesProps {
  identityVerificationID: string
  relayRefetch: RefetchFnDynamic<any, any>
}

export const VerificationsOverridesCreate: React.FC<
  VerificationsOverridesProps
> = (props) => {
  const { submitMutation: submitIdentityVerificationOverrideMutation } =
    useCreateIdentityVerificationOverride()

  const { sendToast } = useToasts()
  interface InputTypes {
    overrideState: string
    reason: string
  }

  const OVERRIDE_STATE_OPTIONS = [
    { text: "", value: "" },
    { text: "Passed", value: "passed" },
    { text: "Failed", value: "failed" },
    { text: "Pending", value: "pending" },
    { text: "Started", value: "started" },
    { text: "Unknown", value: "unknown" },
    { text: "Inputs Invalid", value: "inputs_invalid" },
    { text: "Watchlist Hit", value: "watchlist_hit" },
    { text: "Abandoned", value: "abandoned" },
  ]

  return (
    <>
      <Formik<InputTypes>
        initialValues={{ overrideState: "", reason: "" }}
        validationSchema={Yup.object().shape({
          overrideState: Yup.string().required("A state is required"),
          reason: Yup.string()
            .required("A reason is required")
            .max(180, "Reason must be less than 180 characters"),
        })}
        onSubmit={async (values) => {
          try {
            await submitIdentityVerificationOverrideMutation({
              variables: {
                input: {
                  identityVerificationID: props.identityVerificationID,
                  state: values.overrideState,
                  reason: values.reason,
                },
              },
              rejectIf: (res) => {
                return res.createIdentityVerificationOverride
                  ?.createIdentityVerificationOverrideResponseOrError
                  ?.mutationError
              },
            })
            sendToast({
              variant: "success",
              message: "Identity verification override created",
            })
            props.relayRefetch(
              {
                first: 1,
              },
              {
                onComplete: (error) => {
                  if (error) {
                    console.error("Refetch Error:", error)
                  } else {
                    console.log("Refetch Success")
                  }
                },
              }
            )
          } catch (error) {
            console.error(
              "[forque] Error creating identity verification override:",
              error
            )

            sendToast({
              variant: "error",
              message:
                "There was an error creating an identity verification override",
            })
          }
        }}
      >
        {({ values, handleChange, errors }) => (
          <Form>
            <GridColumns>
              <Column span={4} width={"10em"}>
                <Select
                  placeholder="Select State"
                  options={OVERRIDE_STATE_OPTIONS}
                  onSelect={(state) => {
                    handleChange({
                      target: { name: "overrideState", value: state },
                    })
                  }}
                  error={errors.overrideState}
                ></Select>
              </Column>
              <Column span={7}>
                <Input
                  placeholder="Reason"
                  name="reason"
                  type="text"
                  onChange={handleChange}
                  value={values.reason}
                  error={errors.reason}
                />
              </Column>
              <Column span={1}>
                <Button size="small" type="submit" variant="secondaryOutline">
                  Create
                </Button>
              </Column>
            </GridColumns>
          </Form>
        )}
      </Formik>
    </>
  )
}
