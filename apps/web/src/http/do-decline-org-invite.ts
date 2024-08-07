import { api } from './api-client'

type DeclineOrgInviteRequest = {
  inviteId: string
}

export const doDeclineOrgInvite = async ({
  inviteId,
}: DeclineOrgInviteRequest) => {
  await api.post(`invites/${inviteId}/reject`)
}
