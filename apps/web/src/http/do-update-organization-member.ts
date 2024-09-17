import type { Role } from '@saas/auth'

import { api } from './api-client'

type UpdateOrganizationMemberRequest = {
  orgSlug: string
  memberId: string
  role: Role
}

type UpdateOrganizationMemberResponse = void

export const doUpdateOrganizationMember = async ({
  orgSlug,
  memberId,
  role,
}: UpdateOrganizationMemberRequest): Promise<UpdateOrganizationMemberResponse> => {
  await api.put(`organizations/${orgSlug}/members/${memberId}`, {
    json: {
      role,
    },
  })
}
