import type { Role } from '@saas/auth'

import { api } from './api-client'

type CreateOrganizationInviteRequest = {
  orgSlug: string
  email: string
  role: Role
}

type CreateOrganizationInviteResponse = {
  inviteId: string
}

export const doCreateOrganizationInvite = async ({
  email,
  role,
  orgSlug,
}: CreateOrganizationInviteRequest) => {
  await api
    .post(`organizations/${orgSlug}/invites`, {
      json: {
        email,
        role,
      },
    })
    .json<CreateOrganizationInviteResponse>()
}
