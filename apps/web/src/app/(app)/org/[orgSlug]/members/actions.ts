'use server'

import { type Role, roleSchema } from '@saas/auth'
import { HTTPError } from 'ky'
import { revalidateTag } from 'next/cache'
import { z } from 'zod'

import { getCurrentOrganizationSlug } from '@/auth/get-current-organization'
import { doCreateOrganizationInvite } from '@/http/do-create-organization-invite'
import { doRemoveOrganizationMember } from '@/http/do-remove-organization-member'
import { doRevokeOrganizationInvite } from '@/http/do-revoke-organization-invite'
import { doUpdateOrganizationMember } from '@/http/do-update-organization-member'

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

export const updateMemberAction = async ({
  memberId,
  role,
}: {
  memberId: string
  role: Role
}) => {
  const currentOrg = getCurrentOrganizationSlug()

  try {
    await doUpdateOrganizationMember({
      orgSlug: currentOrg!,
      memberId,
      role,
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

export const revokeInviteAction = async ({
  inviteId,
}: {
  inviteId: string
}) => {
  const currentOrg = getCurrentOrganizationSlug()

  try {
    await doRevokeOrganizationInvite({
      orgSlug: currentOrg!,
      inviteId,
    })

    revalidateTag(`${currentOrg}/invites`)
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

const createInviteSchema = z.object({
  email: z.string().email({ message: 'Invalid e-mail address.' }),
  role: roleSchema,
})

export const createInviteAction = async (data: FormData) => {
  const result = createInviteSchema.safeParse(Object.fromEntries(data))
  const currentOrg = getCurrentOrganizationSlug()

  if (!result.success) {
    const errors = result.error.flatten().fieldErrors

    return {
      success: false,
      message: null,
      errors,
    }
  }

  const { email, role } = result.data

  try {
    await doCreateOrganizationInvite({
      orgSlug: currentOrg!,
      email,
      role,
    })

    revalidateTag(`${currentOrg}/invites`)
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

  return {
    success: true,
    message: 'Successfully created invite.',
    errors: null,
  }
}
