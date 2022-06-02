import { Column, GridColumns } from "@artsy/palette"
import { UserInfoForm } from "./UserInfoForm"
import { UserSaleProfileForm } from "./UserSaleProfileForm"

export const UserForm: React.FC = () => {
  return (
    <>
      <GridColumns>
        <Column span={4}>
          <UserInfoForm />
          <UserSaleProfileForm />
        </Column>
      </GridColumns>
    </>
  )
}
