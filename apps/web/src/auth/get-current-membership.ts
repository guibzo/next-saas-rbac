import { doGetMembership } from '@/http/do-get-membership'

import { getCurrentOrganization } from './get-current-organization'

export const getCurrentMembership = async () => {
  const org = getCurrentOrganization()

  if (!org) {
    return null
  }

  const { membership } = await doGetMembership(org)

  return membership
}
