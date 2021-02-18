import { useMemo } from 'react'
import { useQuery } from 'react-apollo'
import {
  CountryData,
  DisplayData,
  AddressFieldsData,
  LocationSelectData,
} from 'vtex.country-data-settings'

import addressRulesQuery from './graphql/addressRulesQuery.gql'

interface RulesQuery {
  allCountriesData: CountryData[]
}

const useAddressRules = () => {
  const { data } = useQuery<RulesQuery>(addressRulesQuery)

  const addressRules = useMemo(
    () =>
      data?.allCountriesData?.reduce<
        Record<
          string,
          {
            display: DisplayData
            fields: AddressFieldsData
            locationSelect?: LocationSelectData | null
          }
        >
      >(
        (rules, countryData) => ({
          ...rules,
          [countryData.countryISO]: {
            display: countryData.display,
            fields: countryData.addressFields,
            locationSelect: countryData.locationSelect,
          },
        }),
        {}
      ),
    [data]
  )

  return addressRules
}

export default useAddressRules
