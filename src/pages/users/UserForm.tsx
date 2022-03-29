import { Column, GridColumns, Input } from "@artsy/palette"
import { useFormContext } from "./useFormContext"

export const UserForm: React.FC = () => {
  const { handleChange, handleBlur, errors, values, touched } = useFormContext()

  return (
    <GridColumns>
      <Column span={12}>
        <Input
          name="name"
          title="Name"
          placeholder="Enter name"
          autoFocus
          value={values.name}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.name && errors.name}
          required
        />
      </Column>
      <Column span={12}>
        <Input
          name="email"
          title="Email"
          placeholder="Enter email"
          autoFocus
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.email && errors.email}
          required
        />
      </Column>

      {/* <Column span={6}>
        <CountrySelect
          name="address.country"
          title="Country"
          // TODO: Accept a value prop in Select
          // @ts-ignore
          value={values.address.country}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.address?.country && errors.address?.country}
          required
          // FIXME: There's extra margin between title and select in palette
          // than the title and select in input. Open PR to palette
          mt={-0.5}
        />
      </Column> */}
    </GridColumns>
  )
}
