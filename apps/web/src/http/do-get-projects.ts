import type { Project } from '@/_types/project'

import { api } from './api-client'

type GetProjectsResponse = {
  projects: Project[]
}

export const doGetProjects = async (orgSlug: string) => {
  const result = await api
    .get(`organizations/${orgSlug}/projects`)
    .json<GetProjectsResponse>()

  return result
}
