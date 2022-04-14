import { GetServerSideProps } from "next"
import { fetchRelayData } from "system/relay"
import { graphql } from "relay-runtime"
import { UserIdQuery } from "__generated__/UserIdQuery.graphql"
import { Button, Flex, Spacer, Text } from "@artsy/palette"
import { Form, Formik } from "formik"
import { UserFormValues, userValidationSchema } from "./useUserFormContext"
import { UserForm } from "./components/form"
import { useUpdateUser } from "./mutations/useUpdateUser"
import { useUpdateUserSaleProfile } from "./mutations/useUpdateUserSaleProfile"
import Head from "next/head"

interface UserProps {
  user: UserIdQuery["response"]["user"]
}

const User: React.FC<UserProps> = ({ user }) => {
  const { submitMutation: submitUserMutation } = useUpdateUser()
  const { submitMutation: submitSaleProfileMutation } =
    useUpdateUserSaleProfile()

  if (!user) {
    return null
  }

  return (
    <>
      <Head>
        <title>Update User</title>
      </Head>
      <Formik<UserFormValues>
        initialValues={{
          dataTransferOptOut: user.dataTransferOptOut!,
          email: user.email,
          name: user.name,
          phoneNumber: user.phone || undefined,
          userSaleProfile: {
            addressLine1: user.saleProfile?.addressLine1 || undefined,
            addressLine2: user.saleProfile?.addressLine2 || undefined,
            city: user.saleProfile?.city || undefined,
            region: user.saleProfile?.state || undefined,
            postalCode: user.saleProfile?.zip || undefined,
            country: user.saleProfile?.country || undefined,
          },
        }}
        validationSchema={userValidationSchema}
        onSubmit={async (values) => {
          try {
            const mutations = [
              submitUserMutation({
                variables: {
                  input: {
                    id: user.internalID,
                    dataTransferOptOut: values.dataTransferOptOut,
                    email: values.email,
                    name: values.name,
                    phone: values.phoneNumber!,
                  },
                },
              }),
              submitSaleProfileMutation({
                variables: {
                  input: {
                    id: user.saleProfile!.internalID,
                    addressLine1: values.userSaleProfile.addressLine1,
                    addressLine2: values.userSaleProfile.addressLine2,
                    city: values.userSaleProfile.city,
                    state: values.userSaleProfile.region,
                    zip: values.userSaleProfile.postalCode,
                    country: values.userSaleProfile.country,
                  },
                },
              }),
            ]

            await Promise.all(mutations)
          } catch (error) {
            // TODO: Since we'll eventually be submitting a few mutations we'll
            // need to funnel gravity errors up to various sub-sections. (Think,
            // auth errors related to levels.)
            console.error("[forque] Error updating user:", error)
          }
        }}
      >
        {({ isSubmitting, isValid }) => {
          return (
            <Form>
              <Flex justifyContent="space-between" alignItems="center">
                <Text variant="xl">Edit User</Text>
                <Button
                  loading={
                    // FIXME: Fix this in palette
                    isSubmitting ? ("true" as unknown as boolean) : undefined
                  }
                  disabled={!isValid}
                  type="submit"
                >
                  Update
                </Button>
              </Flex>

              <Spacer my={4} />

              <UserForm />
            </Form>
          )
        }}
      </Formik>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const props = await fetchRelayData({
    query: graphql`
      query UserIdQuery($userId: String!) {
        user(id: $userId) {
          internalID
          dataTransferOptOut
          email
          name
          phone
          saleProfile {
            internalID
            addressLine1
            addressLine2
            city
            state
            zip
            country
          }
        }
      }
    `,
    variables: {
      userId: ctx.query.userId,
    },
    ctx,
  })

  return {
    props,
  }
}

export default User
