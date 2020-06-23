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
  rules,
}) => {
  const [localAddress, setLocalAddress] = useState(address)

  const isValid = useMemo(() => {
    if (!address?.country || !rules[address.country]) {
      return false
    }

    for (const [field, fieldSchema] of Object.entries(
      rules[address.country].fields
    ) as Array<[AddressFields, Field]>) {
      const fieldValue = address[field]

      if (fieldSchema.required && !fieldValue) {
        return false
      }

      if (
        fieldSchema.maxLength &&
        fieldValue &&
        fieldValue.length > fieldSchema.maxLength
      ) {
        return false
      }
    }

    return true
  }, [address, rules])

  const state = useMemo(
    () => ({
      countries,
      address: localAddress,
      setAddress: setLocalAddress,
      rules,
      isValid,
    }),
    [countries, localAddress, rules, isValid]
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
