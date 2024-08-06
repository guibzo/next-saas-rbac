import { api } from './api-client'

type RemoveOrganizationMemberRequest = {
  orgSlug: string
  memberId: string
}

type RemoveOrganizationMemberResponse = void

export const doRemoveOrganizationMember = async ({
  orgSlug,
  memberId,
}: RemoveOrganizationMemberRequest): Promise<RemoveOrganizationMemberResponse> => {
  await api.delete(`organizations/${orgSlug}/members/${memberId}`)
}
