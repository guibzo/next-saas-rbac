import { cookies } from 'next/headers'

export const getCurrentOrganization = () => {
  return cookies().get('@saas:org')?.value ?? null
}
