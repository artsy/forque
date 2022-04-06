import type { User } from "next-auth"

// data fetching
export { useGravity } from "./hooks/gravity"
export { useMetaphysics } from "./hooks/metaphysics"

export type UserWithAccessToken = User & { accessToken: string }
