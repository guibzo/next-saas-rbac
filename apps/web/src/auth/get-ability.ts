// user permissions (rbac)

import { defineAbilityFor } from '@saas/auth'

import { getCurrentMembership } from './get-current-membership'

export const ability = async () => {
  const membership = await getCurrentMembership()

  if (!membership) {
    return null
  }

  const ability = defineAbilityFor({
    id: membership.userId,
    role: membership.role,
  })

  return ability
}
