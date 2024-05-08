import { defineAbilityFor, type Role, userSchema } from '@saas/auth'

export const getUserPermissions = (userId: string, role: Role) => {
  const authPackageUser = userSchema.parse({
    id: userId,
    role,
  })

  const ability = defineAbilityFor(authPackageUser)

  return ability
}
