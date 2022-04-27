import { GetServerSideProps } from "next"
import Head from "next/head"
import Image from "next/image"
import { graphql } from "react-relay"
import { fetchRelayData } from "system/relay"
import { pagesQuery$data } from "__generated__/pagesQuery.graphql"

interface HomeProps {
  me: pagesQuery$data["me"]
}

export default function Home({ me }: HomeProps) {
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
          Hi, <strong>{me?.email}</strong>
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
        <div>
          <button
            type="button"
            onClick={() => {
              throw new Error("Sentry Frontend Error")
            }}
          >
            Throw error
          </button>
        </div>
      </div>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const props = await fetchRelayData({
    query: graphql`
      query pagesQuery {
        me {
          email
        }
      }
    `,
    cache: true,
    ctx,
  })

  return {
    props,
  }
}
