import useSWR from "swr"
import { useUser } from "./user"

const metaphysicsFetcher = async (
  query: string,
  variables = {},
  accessToken: string
) => {
  const url = `${process.env.NEXT_PUBLIC_METAPHYSICS_URL}/v2`

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

  return data
}

export const useMetaphysics = (
  query: string,
  variables: Record<string, unknown> = {}
) => {
  const user = useUser()
  const { data, error } = useSWR(
    user ? [query, JSON.stringify(variables), user.accessToken] : null,
    metaphysicsFetcher
  )

  return {
    data,
    error,
    isLoading: !data && !error,
  }
}
