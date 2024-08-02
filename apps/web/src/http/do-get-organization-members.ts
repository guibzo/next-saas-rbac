import type { OrganizationMember } from '@/_types/organization-member'

import { api } from './api-client'

type GetOrganizationMembersResponse = {
  members: OrganizationMember[]
}

export const doGetOrganizationMembers = async (orgSlug: string) => {
  const result = await api
    .get(`organizations/${orgSlug}/members`, {
      next: {
        tags: [`${orgSlug}/members`],
      },
    })
    .json<GetOrganizationMembersResponse>()

  return result
}
