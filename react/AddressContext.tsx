import React, { createContext, ReactNode, useContext } from 'react'
import { Address } from 'vtex.checkout-graphql'

interface Context {
  countries: string[]
  address: Address
}

interface AddressContextProps {
  children: ReactNode
  address: Address
  countries: string[]
}

const AddressContextContext = createContext<Context | undefined>(undefined)

export const AddressContextProvider = ({
  children,
  address,
  countries,
}: AddressContextProps) => {
  const state = { countries: countries, address: address }

  return (
    <AddressContextContext.Provider value={state}>
      {children}
    </AddressContextContext.Provider>
  )
}

export const useAddressContext = () => {
  const context = useContext(AddressContextContext)
  if (context == undefined) {
    throw new Error(
      'useAddressContext must be used within an AddressContextProvider'
    )
  }

  return context
}

export default { AddressContextProvider, useAddressContext }
