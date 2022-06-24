import { Column, GridColumns, Input, Text } from "@artsy/palette"
import { useUserFormContext } from "pages/users/useUserFormContext"

export const UserInfoForm: React.FC = () => {
  const { handleChange, handleBlur, errors, values, touched } =
    useUserFormContext()

  return (
    <>
      <Text variant="lg" mb={4}>
        User Info
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
            autoFocus
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
          />
        </Column>
      </GridColumns>
    </>
  )
}
