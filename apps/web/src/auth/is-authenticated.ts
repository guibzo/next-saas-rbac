import { cookies } from 'next/headers'

export const isAuthenticated = () => {
  return Boolean(cookies().get('token')?.value)
}
