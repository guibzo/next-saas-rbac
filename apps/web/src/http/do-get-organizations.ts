import { api } from './api-client'

type GetOrganizationsResponse = {
  organizations: {
    id: string
    name: string
    slug: string
    avatarUrl: string | null
  }[]
}

export const doGetOrganization = async () => {
  const result = await api.get('organizations').json<GetOrganizationsResponse>()

  return result
}
