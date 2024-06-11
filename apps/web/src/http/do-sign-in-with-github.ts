import { api } from './api-client'

type SignInWithGitHubRequest = {
  code: string
}

type SignInWithGitHubResponse = {
  token: string
}

export const doSignInWithGitHub = async ({ code }: SignInWithGitHubRequest) => {
  const result = await api
    .post('sessions/github', {
      body: JSON.stringify({
        code,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .json<SignInWithGitHubResponse>()

  return result
}
