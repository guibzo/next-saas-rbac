import { api } from './api-client'

type SignInWithEmailAndPasswordRequest = {
  email: string
  password: string
}

type SignInWithEmailAndPasswordResponse = {
  token: string
}

export const doSignInWithEmailAndPassword = async ({
  email,
  password,
}: SignInWithEmailAndPasswordRequest) => {
  console.log('log')

  const result = await api
    .post('sessions/password', {
      json: {
        email,
        password,
      },
    })
    .json<SignInWithEmailAndPasswordResponse>()

  return result
}
