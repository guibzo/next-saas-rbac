import type { Organization } from '@/_types/organization'

import { api } from './api-client'

type GetOrganizationRequest = {
  orgSlug: string
}

type GetOrganizationResponse = {
  organization: Organization
}

export const doGetOrganization = async ({
  orgSlug,
}: GetOrganizationRequest) => {
  const result = await api
    .get(`organizations/${orgSlug}`)
    .json<GetOrganizationResponse>()

  return result
}
