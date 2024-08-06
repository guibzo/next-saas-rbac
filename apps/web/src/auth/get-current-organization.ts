import { cookies } from 'next/headers'

export const getCurrentOrganizationSlug = () => {
  return cookies().get('org')?.value ?? null
}
