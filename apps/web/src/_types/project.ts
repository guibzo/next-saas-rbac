export type Project = {
  description: string
  slug: string
  id: string
  name: string
  avatarUrl: string | null
  organizationId: string
  ownerId: string
  createdAt: string
  owner: {
    id: string
    name: string | null
    avatarUrl: string | null
  }
}
