import { Tabs, Tab } from "@artsy/palette"
import { FC } from "react"
import { CreateOrEditShortcutForm } from "./components/CreateOrEditShortcutForm"
import { EditShortcut } from "./components/EditShortcut"

const ShortcutsPage: FC = () => {
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
