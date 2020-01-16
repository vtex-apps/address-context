import React, { createContext, ReactNode, useContext } from 'react'

interface Context {
  countries: String[]
}

interface AddressContextProps {
  children: ReactNode
}

const AddressContextContext = createContext<Context | undefined>(undefined)

export const AddressContextProvider = ({ children }: AddressContextProps) => {
  const ok = { countries: ['BRA', 'ARG', 'ZZZ'] }

  return (
    <AddressContextContext.Provider value={ok}>
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
