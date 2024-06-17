import type { Role } from '@saas/auth'

import { api } from './api-client'

type GetMembership = {
  membership: {
    id: string
    role: Role
    organizationId: string
    userId: string
  }
}

export const doGetMembership = async (orgSlug: string) => {
  const result = await api
    .get(`organizations/${orgSlug}/membership`)
    .json<GetMembership>()

  return result
}
