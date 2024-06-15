import { api } from './api-client'

type GetProfileResponse = {
  user: {
    id: string
    name: string | null
    email: string
    avatarUrl: string | null
  }
}

export const doGetProfile = async () => {
  const result = await api.get('profile').json<GetProfileResponse>()

  return result
}
