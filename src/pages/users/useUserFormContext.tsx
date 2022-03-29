import * as Yup from "yup"
import { useFormikContext } from "formik"

export interface UserFormValues {
  /*
  artworksPerYear: number
  // auctionDenyList: boolean // TODO
  // buyerStatus: string // TODO: select
  collectorSince: string
  dataTransferOptOut: boolean
  displayFavoritesDialog: boolean
  displayFilterTooltip: boolean
  displayFollowTooltip: boolean
  displayInquiryTooltip: boolean
  */
  email: string
  name: string
  /*
  emailFrequency: string
  gender: string // TODO: select
  industry: string // TODO: select
  isAvailableRepresentative: string
  isCollector: boolean
  isRepresentative: boolean
  location: string
  // namePrefix: string // TODO: select
  // mariatalStatus: string // TODO: select
  notes: string
  phone: string
  // priceRange: string // TODO: select
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
