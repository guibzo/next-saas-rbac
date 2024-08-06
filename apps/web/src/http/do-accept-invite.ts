import { api } from './api-client'

type AcceptInviteRequest = {
  inviteId: string
}

export const doAcceptInvite = async ({ inviteId }: AcceptInviteRequest) => {
  await api.post(`invites/${inviteId}/accept`)
}
