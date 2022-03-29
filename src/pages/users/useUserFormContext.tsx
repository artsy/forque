import * as Yup from "yup"
import { useFormikContext } from "formik"

export interface UserFormValues {
  /*
  artworksPerYear: number
  collectorSince: string
  dataTransferOptOut: boolean
  displayFavoritesDialog: boolean
  displayFilterTooltip: boolean
  displayFollowTooltip: boolean
  displayInquiryTooltip: boolean
  */
  email: string
  name: string
  namePrefix?: string
  firstName?: string
  lastName?: string
  postalCode?: string
  addressLine1?: string
  addressLine2?: string
  city?: string
  region?: string
  phoneNumber?: string
  country?: string
  gender?: string
  mariatalStatus?: string
  birthYear?: string
  spouse?: string
  jobTitle?: string
  employer?: string
  profession?: string
  salary?: string
  industry?: string
  buyerStatus?: string
  priceRange?: string // TODO: format to priceRangeMin / max
  workPhone?: string
  mobilePhone?: string
  fax?: string
  alternativeEmail?: string
  auctionDenyList?: boolean

  // Collector Profile
  confirmedBuyer?: boolean
  professionalBuyer?: boolean
  companyName?: string
  companyWebsite?: string

  // Other stuff
  notes?: string

  // Admin
  emailConfirmedAt?: string
  location?: string
  twoFactorAuthentication?: boolean

  /*
  emailFrequency: string
  industry: string // TODO: select
  isAvailableRepresentative: string
  isCollector: boolean
  isRepresentative: boolean
  phone: string
  priceRangeMax: string
  priceRangeMin: string
  profession: string
  publishToFacebook: boolean
  receiveLotOpeningSoonNotification: boolean
  receiveNewSalesNotification: boolean
  receiveNewWorksNotification: boolean
  receiveOutbidNotification: boolean
  receivePromotionNotification: boolean
  receivePurchaseNotification: boolean
  receiveSaleOpeningClosingNotification: boolean
  shareFollows: boolean
  */
}

export const userValidationSchema = Yup.object({
  email: Yup.string().required("Email is required"),
})

export const useUserFormContext = () => {
  const context = useFormikContext<UserFormValues>()
  return context
}
