import { api } from './api-client'

type AcceptOrgInviteRequest = {
  inviteId: string
}

export const doAcceptOrgInvite = async ({
  inviteId,
}: AcceptOrgInviteRequest) => {
  await api.post(`invites/${inviteId}/accept`)
}
