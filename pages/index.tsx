import type { NextPage } from "next"
import Head from "next/head"

const Home: NextPage = () => {
  return (
    <div className="container mx-auto py-6 w-6/12">
      <Head>
        <title>Artsy</title>
        <meta name="description" content="Artsy admin" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container">
        <h1 className="text-xxl">Welcome to Artsy</h1>
        <p className="my-1">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Harum
          reiciendis corrupti veniam quidem ea adipisci excepturi iure ad,
          laboriosam soluta! Dolorum impedit qui quidem debitis aut ratione
          culpa atque officia!
        </p>
      </main>
    </div>
  )
}

export default Home
