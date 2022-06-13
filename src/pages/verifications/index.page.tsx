import Head from "next/head"
import { Tab, Tabs } from "@artsy/palette"
import { VarificationCreate } from "./components/VerificationCreate"

const VerificationsPage: React.FC = () => {
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
