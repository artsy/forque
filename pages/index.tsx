import type { NextPage } from "next"
import Head from "next/head"
import Image from "next/image"

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

      <div className="flex flex-col items-center mt-4 sm:mt-12">
        <h1 className="mb-4 text-xxl">Welcome to Artsy</h1>
        <p className="mb-4">
          Hi, <strong>{user.email}</strong>
        </p>
        <div className="relative [width:20em] aspect-[196/129]">
          <Image
            src="/under.gif"
            width={196}
            height={129}
            layout="fill"
            alt="Pikachu jackhammering in front of an Under Construction sign"
          />
        </div>
      </div>
    </div>
  )
}

export default Home
