export type Organization = {
  slug: string
  id: string
  name: string
  domain: string | null
  shouldAttachUsersByDomain: boolean
  avatarUrl: string | null
  createdAt: string
  updatedAt: string
  ownerId: string
}
