import { useEffect } from "react"
import Router from "next/router"
import useSWR from "swr"

const userFetcher = (url: string) =>
  fetch(url)
    .then((r) => r.json())
    .then((data) => {
      return {
        user: data?.user || null,
      }
    })

interface useUserOptions {
  /** Path to redirect to (by default, if a current user is not found)  */
  redirectTo?: string

  /**
   * Force the redirect to take place if the user *is* found
   * (rather than the default of redirecting when the user is *not* found)
   */
  redirectIfFound?: boolean
}

export function useUser(options?: useUserOptions) {
  const defaults = {
    redirectTo: null,
    redirectIfFound: false,
  }

  const { redirectTo, redirectIfFound } = { ...defaults, ...options }

  const { data, error } = useSWR("/api/artsy-auth/user", userFetcher)

  const user = data?.user
  const finished = Boolean(data)
  const hasUser = Boolean(user)

  useEffect(() => {
    if (!redirectTo || !finished) return
    if (
      // If redirectTo is set, redirect if the user was not found.
      (redirectTo && !redirectIfFound && !hasUser) ||
      // If redirectIfFound is also set, redirect if the user was found
      (redirectIfFound && hasUser)
    ) {
      Router.push(redirectTo)
    }
  }, [redirectTo, redirectIfFound, finished, hasUser])

  return error ? null : user
}
