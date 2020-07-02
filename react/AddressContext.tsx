import React, { createContext, useContext, useState, useMemo } from 'react'
import { Address } from 'vtex.checkout-graphql'

import { AddressRules, Field, AddressFields } from './types'

type AddressUpdate = Address | ((prevAddress: Address) => Address)

interface Context {
  countries: string[]
  address: Address
  setAddress: (address: AddressUpdate) => void
  rules: AddressRules
  isValid: boolean
  invalidFields: AddressFields[]
}

interface AddressContextProps {
  address: Address
  countries: string[]
  rules: AddressRules
}

const AddressContextContext = createContext<Context | undefined>(undefined)

export const AddressContextProvider: React.FC<AddressContextProps> = ({
  children,
  address,
  countries,
  rules = {},
}) => {
  const [localAddress, setLocalAddress] = useState(address)

  const invalidFields = useMemo(() => {
    if (!localAddress?.country || !rules[localAddress.country]) {
      return []
    }

    return (Object.entries(rules[localAddress.country].fields) as Array<
      [AddressFields, Field]
    >)
      .filter(([field, fieldSchema]) => {
        const fieldValue = localAddress[field]

        if (fieldSchema.required && !fieldValue) {
          return true
        }

        if (
          fieldSchema.maxLength &&
          fieldValue &&
          fieldValue.length > fieldSchema.maxLength
        ) {
          return true
        }

        return false
      })
      .map(([field]) => field)
  }, [localAddress, rules])

  const isValid = useMemo(() => {
    if (!localAddress?.country || !rules[localAddress.country]) {
      return false
    }

    return invalidFields.length === 0
  }, [localAddress, rules, invalidFields])

  const state = useMemo(
    () => ({
      countries,
      address: localAddress,
      setAddress: setLocalAddress,
      rules,
      isValid,
      invalidFields,
    }),
    [countries, localAddress, rules, isValid, invalidFields]
  )

  return (
    <AddressContextContext.Provider value={state}>
      {children}
    </AddressContextContext.Provider>
  )
}

export const useAddressContext = () => {
  const context = useContext(AddressContextContext)
  if (context === undefined) {
    throw new Error(
      'useAddressContext must be used within an AddressContextProvider'
    )
  }

  return context
}

export default { AddressContextProvider, useAddressContext }
