import { GetServerSidePropsContext, NextApiRequest } from "next"
import { getTokenCookie } from "./cookies"
import { decryptSession } from "./session-encryption"

export interface UserSessionData {
  id: string
  email: string
  roles: string[]
  labFeatures: string[]
  lastSignInAt: string
  accessToken: string
}

type Credentials = {
  username: string
  password: string
  otp: string
}

export async function findUser({ username, password, otp }: Credentials) {
  const accessToken = await getGravityAccessToken({ username, password, otp })
  const userProfile = await getUserProfile(accessToken)

  return {
    ...userProfile,
    accessToken,
  }
}

const getGravityAccessToken = async ({
  username,
  password,
  otp,
}: Credentials) => {
  const response = await fetch(
    `${process.env.GRAVITY_URL}/oauth2/access_token`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        client_id: process.env.CLIENT_APPLICATION_ID,
        client_secret: process.env.CLIENT_APPLICATION_SECRET,
        grant_type: "credentials",
        email: username,
        password: password,
        otp_attempt: otp,
      }),
    }
  )
  const json = await response.json()

  if (response.ok) {
    return json.access_token
  } else {
    const errorMessage = [response.statusText, json.error_description].join(
      ": "
    )
    throw new Error(errorMessage)
  }
}

const getUserProfile = async (accessToken: string) => {
  const response = await fetch(`${process.env.GRAVITY_URL}/api/v1/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "X-Access-Token": accessToken,
    },
  })

  const user = await response.json()
  const { id, email, roles, lab_features, last_sign_in_at } = user

  return {
    id,
    email,
    roles,
    labFeatures: lab_features,
    lastSignInAt: last_sign_in_at,
  }
}

export function getUserFromCookie(req: GetServerSidePropsContext["req"]) {
  const cookie = getTokenCookie(req as NextApiRequest)
  if (!cookie) return null
  return decryptSession(cookie)
}
