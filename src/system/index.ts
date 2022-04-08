import type { User } from "next-auth"

export type UserWithAccessToken = User & { accessToken: string }
