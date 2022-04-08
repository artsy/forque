import useSWR from "swr"
import getConfig from "next/config"
import { useSession } from "next-auth/react"
import type { UserWithAccessToken } from "system"

const { publicRuntimeConfig } = getConfig()

const gravityFetcher = async (path: string, accessToken: string) => {
  const url = `${publicRuntimeConfig.NEXT_PUBLIC_GRAVITY_URL}/api/v1/${path}`

  const headers = {
    "Content-Type": "application/json",
    "X-Access-Token": accessToken,
  }

  const response = await fetch(url, { headers })

  if (!response.ok) {
    throw new Error(response.statusText || response.status.toString())
  }

  const json = await response.json()
  return json
}

export const useGravity = (url: string) => {
  const session = useSession()
  const user = session.data?.user as UserWithAccessToken
  const { accessToken } = user

  if (!accessToken)
    throw new Error("useGravity requires a user with an access token")

  const { data, error } = useSWR(
    user ? [url, accessToken] : null,
    gravityFetcher
  )

  return {
    data,
    error,
    isLoading: !data && !error,
  }
}
