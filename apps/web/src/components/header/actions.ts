'use server'

import { revalidateTag } from 'next/cache'

import { doAcceptOrgInvite } from '@/http/do-accept-org-invite'
import { doDeclineOrgInvite } from '@/http/do-decline-org-invite'

export const acceptInviteAction = async ({
  inviteId,
}: {
  inviteId: string
}) => {
  await doAcceptOrgInvite({
    inviteId,
  })

  revalidateTag('organizations')
}

export const declineInviteAction = async ({
  inviteId,
}: {
  inviteId: string
}) => {
  await doDeclineOrgInvite({
    inviteId,
  })

  revalidateTag('organizations')
}
