import React, { createContext, useContext, useState, useMemo } from 'react'
import { Address } from 'vtex.checkout-graphql'

type AddressUpdate = Address | ((prevAddress: Address) => Address)

interface Context {
  countries: string[]
  address: Address
  setAddress: (address: AddressUpdate) => void
}

interface AddressContextProps {
  address: Address
  countries: string[]
}

const AddressContextContext = createContext<Context | undefined>(undefined)

export const AddressContextProvider: React.FC<AddressContextProps> = ({
  children,
  address,
  countries,
}) => {
  const [localAddress, setLocalAddress] = useState(address)

  const state = useMemo(
    () => ({
      countries,
      address: localAddress,
      setAddress: setLocalAddress,
    }),
    [countries, localAddress]
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
