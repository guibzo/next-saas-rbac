import { api } from './api-client'

type RemoveOrganizationInviteRequest = {
  inviteId: string
  orgSlug: string
}

type RemoveOrganizationInviteResponse = void

export const doRevokeOrganizationInvite = async ({
  inviteId,
  orgSlug,
}: RemoveOrganizationInviteRequest): Promise<RemoveOrganizationInviteResponse> => {
  await api.delete(`organizations/${orgSlug}/invites/${inviteId}`)
}
