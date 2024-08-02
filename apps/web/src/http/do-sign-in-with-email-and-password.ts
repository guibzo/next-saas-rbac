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
      body: JSON.stringify({
        email,
        password,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .json<SignInWithEmailAndPasswordResponse>()

  return result
}
