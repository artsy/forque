import {
  Checkbox,
  Column,
  GridColumns,
  Input,
  Text,
  TextArea,
} from "@artsy/palette"
import { useUserFormContext } from "pages/users/useUserFormContext"

export const UserInfoForm: React.FC = () => {
  const { handleChange, handleBlur, errors, values, touched, setFieldValue } =
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

        <Column span={12}>
          <Input
            name="phoneNumber"
            title="Phone Number"
            placeholder="Enter Phone Number"
            value={values.phoneNumber}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.phoneNumber && errors.phoneNumber}
          />
        </Column>

        <Column span={12}>
          <Checkbox
            onSelect={(selected) => {
              setFieldValue("dataTransferOptOut", selected)
            }}
            selected={values.dataTransferOptOut}
          >
            Opt-out of data transfer
          </Checkbox>
        </Column>

        <Column span={12}>
          <TextArea
            name="notes"
            placeholder="Enter Notes"
            value={values.notes}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.notes && errors.notes}
          />
        </Column>
      </GridColumns>
    </>
  )
}
