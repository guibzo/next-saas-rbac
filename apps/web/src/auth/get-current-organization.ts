import { cookies } from 'next/headers'

export const getCurrentOrganizationSlug = () => {
  return cookies().get('@saas:org')?.value ?? null
}
