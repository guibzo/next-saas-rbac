import type { Role } from '@saas/auth'

import { api } from './api-client'

type GetInviteDetailsResponse = {
  invite: {
    id: string
    email: string
    role: Role
    createdAt: string
    organization: {
      name: string
    }
    author: {
      id: string
      name: string | null
      avatarUrl: string | null
    } | null
  }
}

export const doGetInviteDetails = async (inviteId: string) => {
  const result = await api
    .get(`invites/${inviteId}`)
    .json<GetInviteDetailsResponse>()

  return result
}
