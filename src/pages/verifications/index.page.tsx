import Head from "next/head"
import { Tab, Tabs } from "@artsy/palette"
import { VarificationCreate } from "./components/VerificationCreate"
import { useSession } from "next-auth/react"
import { Action, assertPermitted, UserWithAccessToken } from "system"

const VerificationsPage: React.FC = () => {
  const session = useSession()
  const user = session.data?.user as UserWithAccessToken
  assertPermitted(user, Action.list, "verifications")

  return (
    <>
      <Head>
        <title>Identity verifications | Artsy</title>
      </Head>

      <Tabs>
        <Tab name="List"></Tab>
        <Tab name="Create">
          <VarificationCreate />
        </Tab>
      </Tabs>
    </>
  )
}

export default VerificationsPage
