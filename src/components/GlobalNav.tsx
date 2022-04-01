import React from "react"
import Link from "next/link"

import { UserSessionData } from "system/artsy-next-auth/auth/user"
import { signIn, signOut } from "next-auth/react"

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
      <a className="no-underline inline-block p-2 font-bold text-white100 hover:bg-black60 hover:text-white100">
        Home
      </a>
    </Link>
    <Link href="/login">
      <a className="no-underline inline-block p-2 font-bold text-white100 hover:bg-black60 hover:text-white100">
        Login
      </a>
    </Link>
    <button style={{ color: "white" }} onClick={() => signIn()}>
      Sign in
    </button>
  </nav>
)

const LoggedIn = () => (
  <nav className="flex justify-end bg-black100">
    <Link href="/">
      <a className="no-underline inline-block p-2 font-bold text-white100 hover:bg-black60 hover:text-white100">
        Home
      </a>
    </Link>
    <Link href="/users">
      <a className="no-underline inline-block p-2 font-bold text-white100 hover:bg-black60 hover:text-white100">
        Users
      </a>
    </Link>
    <Link href="/artists/dedupe">
      <a className="no-underline inline-block p-2 font-bold text-white100 hover:bg-black60 hover:text-white100">
        Dedupe Artists
      </a>
    </Link>
    <Link href="/uploads">
      <a className="no-underline inline-block p-2 font-bold text-white100 hover:bg-black60 hover:text-white100">
        Uploads
      </a>
    </Link>
    <Link href="/api/artsy-auth/logout">
      <a className="no-underline inline-block p-2 font-bold text-white100 hover:bg-black60 hover:text-white100">
        Logout
      </a>
    </Link>
    <button style={{ color: "white" }} onClick={() => signOut()}>
      Sign out
    </button>
  </nav>
)
