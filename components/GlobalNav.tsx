import React from "react"
import Link from "next/link"

import { UserSessionData } from "../lib/artsy-next-auth/auth/user"

interface Props {
  user: Partial<UserSessionData> | null
}

export const GlobalNav: React.FC<Props> = ({ user }) => {
  if (!user) {
    return <LoggedOut />
  }

  return <LoggedIn />
}

const LoggedOut = () => (
  <nav className="flex justify-end bg-black100">
    <Link href="/">
      <a className="inline-block p-2 font-bold text-white100 hover:bg-black60">
        Home
      </a>
    </Link>
    <Link href="/login">
      <a className="inline-block p-2 font-bold text-white100 hover:bg-black60">
        Login
      </a>
    </Link>
  </nav>
)

const LoggedIn = () => (
  <nav className="flex justify-end bg-black100">
    <Link href="/">
      <a className="inline-block p-2 font-bold text-white100 hover:bg-black60">
        Home
      </a>
    </Link>
    <Link href="/artists/dedupe">
      <a className="inline-block p-2 font-bold text-white100 hover:bg-black60">
        Dedupe Artists
      </a>
    </Link>
    <Link href="/api/artsy-auth/logout">
      <a className="inline-block p-2 font-bold text-white100 hover:bg-black60">
        Logout
      </a>
    </Link>
  </nav>
)
