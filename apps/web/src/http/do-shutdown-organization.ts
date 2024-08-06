import { api } from './api-client'

type ShutdownOrganizationRequest = {
  orgSlug: string
}

type ShutdownOrganizationResponse = void

export const doShutdownOrganization = async ({
  orgSlug,
}: ShutdownOrganizationRequest): Promise<ShutdownOrganizationResponse> => {
  await api.delete(`organizations/${orgSlug}`)
}
