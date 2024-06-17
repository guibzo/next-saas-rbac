import { cookies } from 'next/headers'

export const isAuthenticated = () => {
  return Boolean(cookies().get('@saas:token')?.value)
}
