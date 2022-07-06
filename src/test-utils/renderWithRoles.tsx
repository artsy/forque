import { ReactElement } from "react"
import { SessionProvider } from "next-auth/react"
import { render } from "@testing-library/react"
import { Role } from "system"

interface SessionWithRolesProps {
  roles: Role[]
}

const SessionWithRoles: React.FC<SessionWithRolesProps> = (props) => {
  const { children, roles } = props

  const session = {
    user: {
      email: "fake.user@artsymail.com",
      roles,
    },
    expires: "someday",
  }

  return <SessionProvider session={session}>{children}</SessionProvider>
}

export const renderWithRoles = (ui: ReactElement, roles: Role[]) =>
  render(ui, {
    wrapper: () => <SessionWithRoles roles={roles}>{ui}</SessionWithRoles>,
  })
