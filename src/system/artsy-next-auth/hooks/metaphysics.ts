import useSWR from "swr"
import { useUser } from "./user"
import getConfig from "next/config"
import { Session } from "next-auth"
import { useSession } from "next-auth/react"

const { publicRuntimeConfig } = getConfig()

const metaphysicsFetcher = async (
  query: string,
  variables = {},
  accessToken: string
) => {
  const url = `${publicRuntimeConfig.NEXT_PUBLIC_METAPHYSICS_URL}/v2`

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Access-Token": accessToken,
    },
    body: JSON.stringify({ query, variables }),
  })

  if (!response.ok) {
    throw new Error(response.statusText || response.status.toString())
  }

  const json = await response.json()
  const { data, _errors } = json // TODO: errors

  // uncomment to simulate delay
  // await new Promise<void>((resolve) => setTimeout(() => resolve(), 1000))

  return data
}

export const useMetaphysics = (
  query: string,
  variables: Record<string, unknown> = {}
) => {
  const user = useUser()
  const { data: session } = useSession()

  const { data, error } = useSWR(
    // @ts-ignore
    session?.user ? [query, JSON.stringify(variables), session.user.accessToken] : null,
    metaphysicsFetcher
  )

  return {
    data,
    error,
    isLoading: !data && !error,
  }
}

export const useMetaphysicsWithSession = (
  query: string,
  variables: Record<string, unknown> = {},
  session: Session
) => {
  const { data, error } = useSWR(
    session ? [query, JSON.stringify(variables), session.accessToken] : null,
    metaphysicsFetcher
  )

  return {
    data,
    error,
    isLoading: !data && !error,
  }
}
