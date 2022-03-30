import type { NextApiRequest, NextApiResponse } from "next"

import { getTokenCookie, setTokenCookie, removeTokenCookie } from "./cookies"
import { findUser } from "./user"
import { UserSessionData } from "./user"
import { encryptSession, decryptSession } from "./session-encryption"

export async function handleAuth(req: NextApiRequest, res: NextApiResponse) {
  const action = req.query.path[0]

  if (action === "login") {
    handleLogin(req, res)
  } else if (action === "logout") {
    handleLogout(req, res)
  } else if (action === "user") {
    handleUser(req, res)
  } else {
    res.status(400).json({
      query: JSON.stringify(req.query),
      message: `unrecognized action ${action}`,
    })
  }
}

async function handleLogin(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { username, password, otp } = req.body
    const session: UserSessionData = await findUser({
      username,
      password,
      otp,
    })
    const encryptedSession = await encryptSession(session)
    setTokenCookie(res, encryptedSession)
    res.status(200).send({ done: true })
  } catch (error) {
    let message = "unknown error"
    if (error instanceof Error) message = error.message
    console.error(error)
    res.status(401).send(message)
  }
}

async function handleLogout(req: NextApiRequest, res: NextApiResponse) {
  removeTokenCookie(res)
  res.writeHead(302, { Location: "/" })
  res.end()
}

async function handleUser(req: NextApiRequest, res: NextApiResponse) {
  let session: UserSessionData | null = null
  const cookie = getTokenCookie(req)
  if (cookie) {
    session = await decryptSession(cookie)
  }
  res.status(200).json({ user: session })
}
