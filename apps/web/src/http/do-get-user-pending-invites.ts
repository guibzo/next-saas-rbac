import type { Role } from '@saas/auth'

import { api } from './api-client'

type GetUserPendingInvitesResponse = {
  invites: {
    organization: {
      name: string
    }
    id: string
    email: string
    role: Role
    createdAt: string
    author: {
      id: string
      name: string | null
      avatarUrl: string | null
    } | null
  }[]
}

export const doGetUserPendingInvites = async () => {
  const result = await api
    .get(`pending-invites`)
    .json<GetUserPendingInvitesResponse>()

  return result
}
