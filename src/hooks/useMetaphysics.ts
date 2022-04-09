import useSWR from "swr"
import getConfig from "next/config"
import { useSession } from "next-auth/react"
import type { UserWithAccessToken } from "system"

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
  const { data } = json // TODO: errors

  // uncomment to simulate delay
  // await new Promise<void>((resolve) => setTimeout(() => resolve(), 1000))

  return data
}

export const useMetaphysics = (
  query: string,
  variables: Record<string, unknown> = {}
) => {
  const session = useSession()
  const user = session.data?.user as UserWithAccessToken
  const { accessToken } = user

  if (!accessToken)
    throw new Error("useMetaphysics requires a user with an access token")

  const { data, error } = useSWR(
    user ? [query, JSON.stringify(variables), accessToken] : null,
    metaphysicsFetcher
  )

  return {
    data,
    error,
    isLoading: !data && !error,
  }
}
