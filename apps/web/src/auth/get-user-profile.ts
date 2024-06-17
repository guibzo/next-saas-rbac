import { redirect } from 'next/navigation'

import { doGetProfile } from '@/http/do-get-profile'

import { isAuthenticated } from './is-authenticated'

export const getUserProfile = async () => {
  if (!isAuthenticated()) {
    redirect('/auth/sign-in')
  }

  try {
    const { user } = await doGetProfile()

    return { user }
  } catch {}

  redirect('/api/auth/sign-out')
}
