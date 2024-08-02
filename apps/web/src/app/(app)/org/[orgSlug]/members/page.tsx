import type { Metadata } from 'next'

import { ability } from '@/auth/get-ability'

import { Invites } from './invites'
import { MembersList } from './members-list'

export const metadata: Metadata = {
  title: 'Members',
}

export default async function Members() {
  const permissions = await ability()

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Members</h1>

      <div className="space-y-4">
        {permissions?.can('get', 'Invite') && <Invites />}
        {permissions?.can('get', 'User') && <MembersList />}
      </div>
    </div>
  )
}
