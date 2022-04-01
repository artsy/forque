import NextAuth from "next-auth"
import { UserinfoEndpointHandler } from "next-auth/providers"

export default NextAuth({
  callbacks: {
    async session({ session, token, user }) {
      console.log({ session, token, user })
      // Send properties to the client, like an access_token from a provider.
      session.accessToken = token.accessToken
      return session
    },
  },
  providers: [
    {
      id: "artsy",
      clientId: process.env.CLIENT_APPLICATION_ID,
      clientSecret: process.env.CLIENT_APPLICATION_SECRET,
      name: "Artsy",
      type: "oauth",
      authorization: `${process.env.GRAVITY_URL}/oauth2/authorize`,
      token: {
        url: `${process.env.GRAVITY_URL}/oauth2/access_token?on_success=200`,
        params: { on_success: 200 },
      },
      client: {
        token_endpoint_auth_method: "client_secret_post",
      },
      userinfo: {
        url: `${process.env.GRAVITY_URL}/api/v1/me`,
        async request(context) {
          const userinfo = context?.provider
            ?.userinfo as UserinfoEndpointHandler
          const response = await fetch(userinfo.url!, {
            headers: {
              "X-Access-Token": context.tokens.access_token,
            } as HeadersInit, // override default of Authorization: Bearer ... token
          })
          const actualResponse = await response.json()
          return { ...actualResponse, accessToken: context.tokens.access_token }
        },
      },
      profile(profile) {
        return {
          id: profile?.id,
          name: profile?.name,
          email: profile?.email,
          foo: "bar",
          accessToken: profile.accessToken,
        }
      },
    },
  ],
})
