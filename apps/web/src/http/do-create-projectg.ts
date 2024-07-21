import { api } from './api-client'

type CreateProjectRequest = {
  orgSlug: string
  name: string
  description: string
}

type CreateProjectResponse = void

export const doCreateProject = async ({
  name,
  description,
  orgSlug,
}: CreateProjectRequest): Promise<CreateProjectResponse> => {
  await api.post(`organizations/${orgSlug}/projects`, {
    body: JSON.stringify({
      name,
      description,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  })
}
