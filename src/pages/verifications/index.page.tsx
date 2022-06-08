import Head from "next/head"
import { Tab, Tabs } from "@artsy/palette"
import { VerificationsCreate } from "./components/VerificationsCreate"
import { VerificationsList } from "./components/VerificationsList"
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
        <Tab name="List">
          <VerificationsList />
        </Tab>
        <Tab name="Create">
          <VerificationsCreate />
        </Tab>
      </Tabs>
    </>
  )
}

export default VerificationsPage
