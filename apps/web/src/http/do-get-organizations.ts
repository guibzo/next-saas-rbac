import type { Organization } from '@/_types/organization'

import { api } from './api-client'

type GetOrganizationsResponse = {
  organizations: Organization[]
}

export const doGetOrganization = async () => {
  const result = await api.get('organizations').json<GetOrganizationsResponse>()

  return result
}
