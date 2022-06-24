import { Column, GridColumns, Input, Text } from "@artsy/palette"
import { useUserFormContext } from "pages/users/useUserFormContext"

export const UserSaleProfileForm: React.FC = () => {
  const { handleChange, handleBlur, errors, values, touched } =
    useUserFormContext()

  return (
    <>
      <Text variant="lg" mb={4} my={2}>
        Sale Profile Info (Internal Only)
      </Text>

      <GridColumns>
        <Column span={12}>
          <Input
            name="userSaleProfile.country"
            title="Country"
            placeholder="Enter Country"
            value={values.userSaleProfile.country}
            onChange={handleChange}
            onBlur={handleBlur}
            error={
              touched.userSaleProfile?.country &&
              errors.userSaleProfile?.country
            }
          />
        </Column>

        <Column span={12}>
          <Input
            name="userSaleProfile.postalCode"
            title="Postal Code"
            placeholder="Enter Postal Code"
            value={values.userSaleProfile.postalCode}
            onChange={handleChange}
            onBlur={handleBlur}
            error={
              touched.userSaleProfile?.postalCode &&
              errors.userSaleProfile?.postalCode
            }
          />
        </Column>

        <Column span={12}>
          <Input
            name="userSaleProfile.addressLine1"
            title="Address Line 1"
            placeholder="Enter Address Line 1"
            value={values.userSaleProfile.addressLine1}
            onChange={handleChange}
            onBlur={handleBlur}
            error={
              touched.userSaleProfile?.addressLine1 &&
              errors.userSaleProfile?.addressLine1
            }
          />
        </Column>

        <Column span={12}>
          <Input
            name="userSaleProfile.addressLine2"
            title="Address Line 2"
            placeholder="Enter Address Line 2"
            value={values.userSaleProfile.addressLine2}
            onChange={handleChange}
            onBlur={handleBlur}
            error={
              touched.userSaleProfile?.addressLine2 &&
              errors.userSaleProfile?.addressLine2
            }
          />
        </Column>

        <Column span={12}>
          <Input
            name="userSaleProfile.city"
            title="City"
            placeholder="Enter City"
            value={values.userSaleProfile.city}
            onChange={handleChange}
            onBlur={handleBlur}
            error={
              touched.userSaleProfile?.city && errors.userSaleProfile?.city
            }
          />
        </Column>

        <Column span={12}>
          <Input
            name="userSaleProfile.region"
            title="Region"
            placeholder="Enter Region"
            value={values.userSaleProfile.region}
            onChange={handleChange}
            onBlur={handleBlur}
            error={
              touched.userSaleProfile?.region && errors.userSaleProfile?.region
            }
          />
        </Column>
      </GridColumns>
    </>
  )
}
