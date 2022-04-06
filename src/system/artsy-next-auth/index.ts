import type { GetServerSidePropsContext } from "next"

// data fetching
export { useGravity } from "./hooks/gravity"
export { useMetaphysics } from "./hooks/metaphysics"

// temp, till we wire up next-auth
export function getUserFromCookie(_req: GetServerSidePropsContext["req"]) {
  return {
    email: "test@example.com",
    accessToken: "omglmfao",
  }
}
