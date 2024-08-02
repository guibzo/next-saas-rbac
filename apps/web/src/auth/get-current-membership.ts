import { doGetMembership } from '@/http/do-get-membership'

import { getCurrentOrganizationSlug } from './get-current-organization'

export const getCurrentMembership = async () => {
  const org = getCurrentOrganizationSlug()

  if (!org) {
    return null
  }

  const { membership } = await doGetMembership(org)

  return membership
}
