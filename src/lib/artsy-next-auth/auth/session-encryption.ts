import { UserSessionData } from "./user"

// TODO: for extra security replace with actual encryption e.g. Iron
export async function encryptSession(session: UserSessionData) {
  const json = JSON.stringify(session)
  const buff = Buffer.from(json)
  const encodedButNotActuallyEncrypedSessionData = buff.toString("base64")
  return Promise.resolve(encodedButNotActuallyEncrypedSessionData)
}

// TODO: for extra security replace with actual decryption e.g. Iron
export async function decryptSession(cookie: string) {
  const buff = Buffer.from(cookie, "base64")
  const decoded = buff.toString("ascii")
  const session: UserSessionData = JSON.parse(decoded)
  return Promise.resolve(session)
}
