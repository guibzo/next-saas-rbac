'use server'

import { HTTPError } from 'ky'
import { revalidateTag } from 'next/cache'

import { getCurrentOrganizationSlug } from '@/auth/get-current-organization'
import { doRemoveOrganizationMember } from '@/http/do-remove-organization-member'

export const removeMemberAction = async ({
  memberId,
}: {
  memberId: string
}) => {
  const currentOrg = getCurrentOrganizationSlug()

  try {
    await doRemoveOrganizationMember({
      orgSlug: currentOrg!,
      memberId,
    })

    revalidateTag(`${currentOrg}/members`)
  } catch (err) {
    if (err instanceof HTTPError) {
      const { message } = await err.response.json()

      return { success: false, message, errors: null }
    }

    console.error(err)

    return {
      success: false,
      message: 'Unexpected error, try again in a few minutes.',
      errors: null,
    }
  }
}
