import type { NextPage } from "next"
import Head from "next/head"

import { useUser } from "../lib/artsy-next-auth"

const Home: NextPage = () => {
  const user = useUser()

  return (
    <div>
      <Head>
        <title>Artsy</title>
        <meta name="description" content="Artsy admin" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div>
        <h1 className="text-xxl">Welcome to Artsy</h1>
        <p className="my-1 p-1 bg-blue10">Hi there 👋🏽 {user.email}</p>
        <p className="my-1">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Harum
          reiciendis corrupti veniam quidem ea adipisci excepturi iure ad,
          laboriosam soluta! Dolorum impedit qui quidem debitis aut ratione
          culpa atque officia!
        </p>
      </div>
    </div>
  )
}

export default Home
