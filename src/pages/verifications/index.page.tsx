import Head from "next/head"
import { Tab, TabInfo, Tabs } from "@artsy/palette"
import { VerificationsCreate } from "./components/VerificationsCreate"
import { VerificationsList } from "./components/VerificationsList"
import { useSession } from "next-auth/react"
import { assertPermitted, UserWithAccessToken } from "system"
import { useRouter } from "next/router"

const VerificationsPage: React.FC = () => {
  const router = useRouter()
  const session = useSession()
  const user = session.data?.user as UserWithAccessToken
  assertPermitted(user, "verifications")

  if (Array.isArray(router.query.email)) {
    throw new Error(
      "More than one email in the url query string is not supported"
    )
  }

  const initialTabIndex = router.query.action == "create" ? 1 : 0

  return (
    <>
      <Head>
        <title>Identity Verifications | Artsy</title>
      </Head>

      <Tabs
        initialTabIndex={initialTabIndex}
        onChange={(activeTab) => {
          if ((activeTab as TabInfo).name === "Create") {
            router.push("/verifications?action=create")
          } else {
            router.push("/verifications")
          }
        }}
      >
        <Tab name="List">
          <VerificationsList email={router.query.email} />
        </Tab>
        <Tab name="Create">
          <VerificationsCreate email={router.query.email} />
        </Tab>
      </Tabs>
    </>
  )
}

export default VerificationsPage
