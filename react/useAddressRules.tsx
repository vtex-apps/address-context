import { useMemo } from 'react'
import { useQuery } from 'react-apollo'

import addressRulesQuery from './graphql/addressRulesQuery.gql'

const useAddressRules = () => {
  const { data } = useQuery(addressRulesQuery)

  const addressRules = useMemo(
    () =>
      data?.allCountriesData.reduce(
        (rules: any, countryData: any) => ({
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
