import type { Role } from '@saas/auth'

import { api } from './api-client'

type GetOrganizationInvitesResponse = {
  invites: {
    id: string
    role: Role
    email: string
    createdAt: string
    author: {
      id: string
      name: string | null
      email: string
      avatarUrl: string | null
    } | null
  }[]
}

export const doGetOrganizationInvites = async (orgSlug: string) => {
  const result = await api
    .get(`organizations/${orgSlug}/invites`, {
      next: {
        tags: [`${orgSlug}/invites`],
      },
    })
    .json<GetOrganizationInvitesResponse>()

  return result
}
