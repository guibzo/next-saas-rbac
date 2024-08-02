import type { Role } from '@saas/auth'

export const formatRoleName = (role: Role) => {
  const formattedRoleName =
    role.charAt(0).toUpperCase() + role.slice(1).toLowerCase()

  return formattedRoleName
}
