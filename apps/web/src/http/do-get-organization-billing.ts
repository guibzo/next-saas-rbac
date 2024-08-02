import { api } from './api-client'

type GetOrganizationBillingRequest = {
  orgSlug: string
}

type GetOrganizationBillingResponse = {
  billing: {
    seats: {
      amount: number
      unit: number
      price: number
    }
    projects: {
      amount: number
      unit: number
      price: number
    }
    total: number
  }
}

export const doGetOrganizationBilling = async ({
  orgSlug,
}: GetOrganizationBillingRequest) => {
  const result = await api
    .get(`organizations/${orgSlug}/billing`)
    .json<GetOrganizationBillingResponse>()

  return result
}
