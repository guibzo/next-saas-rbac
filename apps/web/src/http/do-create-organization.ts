import { api } from './api-client'

type CreateOrganizationRequest = {
  name: string
  domain: string | null
  shouldAttachUsersByDomain: boolean
}

type CreateOrganizationResponse = void

export const doCreateOrganization = async ({
  domain,
  name,
  shouldAttachUsersByDomain,
}: CreateOrganizationRequest): Promise<CreateOrganizationResponse> => {
  await api.post('organizations', {
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
