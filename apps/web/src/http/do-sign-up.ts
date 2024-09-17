import { api } from './api-client'

type SignUpRequest = {
  name: string
  email: string
  password: string
}

type SignUpResponse = void

export const doSignUp = async ({
  email,
  name,
  password,
}: SignUpRequest): Promise<SignUpResponse> => {
  await api.post('users', {
    json: {
      email,
      name,
      password,
    },
  })
}
