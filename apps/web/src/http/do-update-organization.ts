import { api } from './api-client'

type UpdateOrganizationRequest = {
  orgSlug: string
  name: string
  domain: string | null
  shouldAttachUsersByDomain: boolean
}

type UpdateOrganizationResponse = void

export const doUpdateOrganization = async ({
  domain,
  orgSlug,
  name,
  shouldAttachUsersByDomain,
}: UpdateOrganizationRequest): Promise<UpdateOrganizationResponse> => {
  await api.put(`organizations/${orgSlug}`, {
    body: JSON.stringify({
      shouldAttachUsersByDomain,
      name,
      domain,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  })
}
