import { FC } from "react"
import Link from "next/link"
import { ArtsyMarkIcon, Flex, Join, Spacer, Text } from "@artsy/palette"
import styled, { css } from "styled-components"
import { themeGet } from "@styled-system/theme-get"
import { useRouter } from "next/router"
import { signIn, signOut } from "next-auth/react"
import type { UserWithAccessToken } from "system"

interface GlobalNavProps {
  user?: UserWithAccessToken
}

export const GlobalNav: FC<GlobalNavProps> = ({ user }) => {
  return (
    <Flex bg="black100" justifyContent="space-between" py={1} px={2}>
      <Link href="/" passHref>
        <Flex alignItems="center" as="a">
          <ArtsyMarkIcon fill="white100" width={40} height={40} />
        </Flex>
      </Link>

      <Flex>
        <Join separator={<Spacer ml={1} />}>
          {user ? (
            // Logged in
            <>
              <Item href="/">Home</Item>
              <Item href="/users">Users</Item>
              <Item href="/artists/dedupe">Dedupe Artists</Item>
              <Item href="/uploads">Uploads</Item>
              <Anchor onClick={() => signOut()}>Logout</Anchor>
            </>
          ) : (
            // Logged out
            <>
              <Item href="/">Home</Item>
              <Anchor onClick={() => signIn("artsy")}>Login</Anchor>
            </>
          )}
        </Join>
      </Flex>
    </Flex>
  )
}

const Anchor = styled(Text).attrs<{ active?: boolean }>({
  as: "a",
  variant: "sm",
  px: 1,
  py: 0.5,
})`
  color: ${themeGet("colors.white100")};
  text-decoration: none;
  transition: color 250ms;
  border-radius: 4px;
  display: flex;
  align-items: center;

  &:hover {
    background-color: ${themeGet("colors.black60")};
    color: ${themeGet("colors.white100")};
  }

  ${({ active }) =>
    active &&
    css`
      background-color: ${themeGet("colors.black60")};
      color: ${themeGet("colors.white100")};
    `}
`

const Item: FC<{ href: string }> = ({ children, href }) => {
  const router = useRouter()
  const active =
    href === "/" ? router.pathname === "/" : router.pathname.startsWith(href)

  return (
    <Link href={href} passHref>
      <Anchor active={active}>{children}</Anchor>
    </Link>
  )
}
