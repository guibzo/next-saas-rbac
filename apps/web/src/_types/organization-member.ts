import type { Role } from '@saas/auth'

export type OrganizationMember = {
  id: string
  userId: string
  role: Role
  name: string | null
  email: string
  avatarUrl: string | null
}
