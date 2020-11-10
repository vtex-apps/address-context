import { Address, AddressType } from 'vtex.checkout-graphql'

import { AddressFields, AddressRules, Field } from './types'

export const validateAddress = (
  address: Address | null | undefined,
  rules: AddressRules
) => {
  if (!address?.country || !rules[address.country]) {
    return {
      isValid: false,
      invalidFields: [
        'number',
        'postalCode',
        'city',
        'complement',
        'reference',
        'neighborhood',
        'state',
        'country',
        'receiverName',
        'street',
      ] as AddressFields[],
    }
  }

  const invalidFields = (Object.entries(rules[address.country].fields) as Array<
    [AddressFields, Field]
  >)
    .filter(([field, fieldSchema]) => {
      if (field === 'isDisposable') {
        return false
      }

      const fieldValue = address[field]

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

      if (fieldSchema.pattern) {
        return fieldValue?.match(fieldSchema.pattern) === null
      }

      return false
    })
    .map(([field]) => field)

  return {
    isValid: invalidFields.length === 0,
    invalidFields,
  }
}

export const createEmptyAddress = (disposable = false): Address => {
  return {
    addressId: null,
    addressType: 'residential' as AddressType,
    geoCoordinates: [],
    number: null,
    postalCode: null,
    city: null,
    complement: null,
    reference: null,
    neighborhood: null,
    state: null,
    country: null,
    receiverName: null,
    street: null,
    isDisposable: disposable,
  }
}

export default { validateAddress, createEmptyAddress }
