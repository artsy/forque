import { Tabs, Tab } from "@artsy/palette"
import { FC } from "react"
import { CreateOrEditShortcut } from "./components/CreateOrEditShortcut"
import { EditShortcut } from "./components/EditShortcut"

const ShortcutsPage: FC = () => {
  return (
    <>
      <Tabs>
        <Tab name="Create">
          <CreateOrEditShortcut isEditContext={false} />
        </Tab>
        <Tab name="Edit">
          <EditShortcut />
        </Tab>
      </Tabs>
    </>
  )
}

export default ShortcutsPage
