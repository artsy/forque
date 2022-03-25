import type { NextPage } from "next"
import Head from "next/head"
import getConfig from "next/config"

const { publicRuntimeConfig } = getConfig()

const Home: NextPage = (props) => {
  return (
    <div>
      <Head>
        <title>Artsy</title>
        <meta name="description" content="Artsy admin" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex flex-col items-center mt-4 sm:mt-12">
        <h1 className="text-xxl">Hello, Env (server)</h1>
        <h2 className="mt-4 mb-2 text-lg">process.env</h2>
        GRAVITY_URL: ⚠️ {process.env.GRAVITY_URL} (not expected)
        <br />
        METAPHYSICS_URL: ⚠️ {process.env.METAPHYSICS_URL} (not expected)
        <br />
        NEXT_PUBLIC_GRAVITY_URL: {process.env.NEXT_PUBLIC_GRAVITY_URL}
        <br />
        NEXT_PUBLIC_METAPHYSICS_URL: {process.env.NEXT_PUBLIC_METAPHYSICS_URL}
        <br />
        <h2 className="mt-4 mb-2 text-lg">publicRuntimeConfig</h2>
        NEXT_PUBLIC_GRAVITY_URL: {publicRuntimeConfig.NEXT_PUBLIC_GRAVITY_URL}
        <br />
        NEXT_PUBLIC_METAPHYSICS_URL:{" "}
        {publicRuntimeConfig.NEXT_PUBLIC_METAPHYSICS_URL}
        <h2 className="mt-4 mb-2 text-lg">serverSideProps</h2>
        <pre>{JSON.stringify(props)}</pre>
      </div>
    </div>
  )
}

export async function getServerSideProps() {
  console.log({ mp: process.env.GRAVITY_URL })
  console.log({ grav: process.env.METAPHYSICS_URL })
  return {
    props: { foo: "bar" }, // will be passed to the page component as props
  }
}

export default Home
