import { Checkbox, Column, GridColumns, Input, Text } from "@artsy/palette"
import { useUserFormContext } from "pages/users/useUserFormContext"

export const CollectorProfileForm: React.FC = () => {
  const { handleChange, handleBlur, errors, values, touched, setFieldValue } =
    useUserFormContext()

  return (
    <>
      <Text variant="lg" mb={4}>
        Collector Profile
      </Text>

      <GridColumns>
        <Column span={12}>
          <Checkbox
            onSelect={(selected) => {
              setFieldValue("confirmedBuyer", selected)
            }}
            selected={values.confirmedBuyer}
          >
            Confirmed Buyer
          </Checkbox>
        </Column>
        <Column span={12}>
          <Checkbox
            onSelect={(selected) => {
              setFieldValue("professionalBuyer", selected)
            }}
            selected={values.professionalBuyer}
          >
            Professional Buyer
          </Checkbox>
        </Column>
        <Column span={12}>
          <Input
            name="companyName"
            title="Company Name"
            placeholder="Enter Company Name"
            autoFocus
            value={values.companyName}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.companyName && errors.companyName}
          />
        </Column>
        <Column span={12}>
          <Input
            name="companyWebsite"
            title="Company Website"
            placeholder="Enter Company Website"
            autoFocus
            value={values.companyWebsite}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.companyWebsite && errors.companyWebsite}
          />
        </Column>
      </GridColumns>
    </>
  )
}
