import { Tabs, Tab } from "@artsy/palette"
import { FC } from "react"
import { CreateOrEditShortcutForm } from "./components/CreateOrEditShortcutForm"
import { EditShortcut } from "./components/EditShortcut"
import { assertPermittedAccess } from "system"
import type { UserWithAccessToken } from "system"
import { useSession } from "next-auth/react"

const ShortcutsPage: FC = () => {
  const session = useSession()
  const user = session.data?.user as UserWithAccessToken
  assertPermittedAccess(user, "shortcuts")

  return (
    <>
      <Tabs>
        <Tab name="Create">
          <CreateOrEditShortcutForm isEditContext={false} />
        </Tab>
        <Tab name="Edit">
          <EditShortcut />
        </Tab>
      </Tabs>
    </>
  )
}

export default ShortcutsPage

export const getServerSideProps = () => ({ props: {} })
