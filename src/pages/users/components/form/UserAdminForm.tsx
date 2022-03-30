import { Checkbox, Column, GridColumns, Input, Text } from "@artsy/palette"
import { useUserFormContext } from "pages/users/useUserFormContext"

export const UserAdminForm: React.FC = () => {
  const { handleChange, handleBlur, errors, values, touched, setFieldValue } =
    useUserFormContext()

  return (
    <>
      <Text variant="lg" mb={4}>
        Admin Settings
      </Text>

      <GridColumns>
        <Column span={12}>
          <Input
            name="name"
            title="Name"
            placeholder="Enter name"
            value={values.name}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.name && errors.name}
          />
        </Column>
        <Column span={12}>
          <Input
            name="email"
            title="Email"
            placeholder="Enter email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.email && errors.email}
            disabled
          />
        </Column>
        <Column span={12}>
          <Input
            name="emailConfirmedAt"
            title="Email Confirmed At"
            value={values.emailConfirmedAt}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.emailConfirmedAt && errors.emailConfirmedAt}
            disabled
          />
        </Column>
        <Column span={12}>
          <Input
            name="location"
            title="Location"
            value={values.location}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.location && errors.location}
            disabled
          />
        </Column>
        <Column span={12}>
          <Checkbox
            onSelect={(selected) => {
              setFieldValue("twoFactorAuthentication", selected)
            }}
            selected={values.twoFactorAuthentication}
          >
            Two Factor Authentication
          </Checkbox>
        </Column>
        <Column span={12}>
          <Text variant="lg" mt={1}>
            Roles
          </Text>

          {/* TODO: Figure out what the expected gravity values are for these;
              here we only grabbed keys */}
          {[
            "Team",
            "Admin",
            "Billing Admin",
            "Consignments Manager",
            "Customer Support",
            "Genomer",
            "Metadata Admin",
            "Partner Support",
            "Role Manager",
            "Sales Admin",
            "Sales Observer",
            "Verification Admin",
          ].map((role, index) => {
            return (
              <Checkbox
                my={2}
                key={index}
                onSelect={(selected) => {
                  setFieldValue("role", selected)
                }}
                selected={values.twoFactorAuthentication}
              >
                {role}
              </Checkbox>
            )
          })}
        </Column>
      </GridColumns>
    </>
  )
}
