import { Address } from 'vtex.checkout-graphql'
import type {
  AddressFieldsData,
  DisplayData,
  LocationSelectData,
  Field,
} from 'vtex.country-data-settings'

export type AddressFields = keyof Omit<Address, '__typename' | 'geoCoordinates'>

export interface CountryRules {
  fields: AddressFieldsData
  display: DisplayData
  locationSelect?: LocationSelectData | null
}

export interface AddressRules {
  [key: string]: CountryRules
}

export { Field }
