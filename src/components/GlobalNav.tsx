import { ArtsyMarkIcon, Box, Flex, Text } from "@artsy/palette"
import { themeGet } from "@styled-system/theme-get"
import { signIn, signOut } from "next-auth/react"
import Link from "next/link"
import { useRouter } from "next/router"
import { FC } from "react"
import styled, { css } from "styled-components"
import type { UserWithAccessToken } from "system"

interface GlobalNavProps {
  user?: UserWithAccessToken
}

export const GlobalNav: FC<GlobalNavProps> = ({ user }) => {
  return (
    <Flex
      bg="black100"
      justifyContent="space-between"
      py={1}
      px={2}
      alignItems="center"
    >
      <Link href="/" passHref>
        <Flex alignItems="center" as="a">
          <ArtsyMarkIcon fill="white100" width={40} height={40} />
        </Flex>
      </Link>

      <Flex>
        {user ? (
          // Logged in
          <>
            <Item href="/">Home</Item>
            {(user.roles.includes("admin") ||
              user.roles.includes("customer_support")) && (
              <Item href="/users">Users</Item>
            )}
            {user.roles.includes("admin") && (
              <Item href="/artists/dedupe">Dedupe Artists</Item>
            )}
            {(user.roles.includes("admin") ||
              user.roles.includes("customer_support")) && (
              <Item href="/my-collection">My Collection</Item>
            )}
            {user.roles.includes("team") && (
              <Item href="/uploads">Uploads</Item>
            )}
            <Item href="#" onClick={() => signOut()}>
              Logout
            </Item>
          </>
        ) : (
          // Logged out
          <>
            <Item href="/">Home</Item>
            <Item href="#" onClick={() => signIn("artsy")}>
              Login
            </Item>
          </>
        )}
      </Flex>
    </Flex>
  )
}

const Anchor = styled(Text).attrs<{ active?: boolean }>({
  as: "a",
  variant: "sm",
  px: 1,
  py: 0.5,
  ml: 1,
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

const Item: FC<{ href: string; onClick?: () => void }> = ({
  children,
  href,
  onClick,
}) => {
  const router = useRouter()
  const active =
    href === "/" ? router.pathname === "/" : router.pathname.startsWith(href)

  return (
    <Box onClick={onClick}>
      <Link href={href} passHref>
        <Anchor active={active}>{children}</Anchor>
      </Link>
    </Box>
  )
}
