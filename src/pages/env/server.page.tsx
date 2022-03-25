import type { NextPage } from "next"
import Head from "next/head"

const Home: NextPage = (props) => {
  return (
    <div>
      <Head>
        <title>Artsy</title>
        <meta name="description" content="Artsy admin" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex flex-col items-center mt-4 sm:mt-12">
        <h1 className="mb-4 text-xxl">Hello, Env (server)</h1>
        GRAVITY_URL: {process.env.GRAVITY_URL}
        <br />
        METAPHYSICS_URL: {process.env.METAPHYSICS_URL}
        <br />
        NEXT_PUBLIC_GRAVITY_URL: {process.env.NEXT_PUBLIC_GRAVITY_URL}
        <br />
        NEXT_PUBLIC_METAPHYSICS_URL: {process.env.NEXT_PUBLIC_METAPHYSICS_URL}
        <br />
      </div>

      <pre>{JSON.stringify(props)}</pre>
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
