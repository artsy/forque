import useSWR from "swr"
import { useUser } from "./user"

const gravityFetcher = async (path: string, accessToken: string) => {
  const url = `${process.env.NEXT_PUBLIC_GRAVITY_URL}/api/v1/${path}`

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
  const user = useUser()
  const { data, error } = useSWR(
    user ? [url, user.accessToken] : null,
    gravityFetcher
  )

  return {
    data,
    error,
    isLoading: !data && !error,
  }
}
