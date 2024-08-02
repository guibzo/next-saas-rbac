import { roleSchema } from '@saas/auth'

export const getRolesList = () => {
  const rolesList = roleSchema.options.map((option) => option.value)

  return rolesList
}
