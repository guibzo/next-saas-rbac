import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import { doGetProfile } from '@/http/do-get-profile'

export const isAuthenticated = () => {
  return Boolean(cookies().get('@saas:token')?.value)
}

export const auth = async () => {
  const token = cookies().get('@saas:token')?.value

  if (!token) {
    redirect('/auth/sign-in')
  }

  try {
    const { user } = await doGetProfile()

    return { user }
  } catch {}

  redirect('/api/auth/sign-out')
}
