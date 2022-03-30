import { Column, GridColumns } from "@artsy/palette"
import { CollectorProfileForm } from "./CollectorProfileForm"
import { UserAdminForm } from "./UserAdminForm"
import { UserFairActionsForm } from "./UserFairActionsForm"
import { UserInfoForm } from "./UserInfoForm"
import { UserInterestsForm } from "./UserInterestsForm"
import { UserTagsForm } from "./UserTagsForm"

export const UserForm: React.FC = () => {
  return (
    <>
      <GridColumns>
        <Column span={4}>
          <UserInfoForm />
        </Column>
        <Column span={4} px={4}>
          <CollectorProfileForm />
          <UserTagsForm />
          <UserFairActionsForm />
          <UserInterestsForm />
        </Column>
        <Column span={4}>
          <UserAdminForm />
        </Column>
      </GridColumns>
    </>
  )
}
