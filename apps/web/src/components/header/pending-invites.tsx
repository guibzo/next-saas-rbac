'use client'

import { useQuery, useQueryClient } from '@tanstack/react-query'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import {
  LucideCheck,
  LucideLoader2,
  LucideMailPlus,
  LucideX,
} from 'lucide-react'
import { useState } from 'react'

import { doAcceptOrgInvite } from '@/http/do-accept-org-invite'
import { doDeclineOrgInvite } from '@/http/do-decline-org-invite'
import { doGetUserPendingInvites } from '@/http/do-get-user-pending-invites'

import { Button } from '../ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'

dayjs.extend(relativeTime)

export const PendingInvites = () => {
  const queryClient = useQueryClient()
  const [isOpen, setIsOpen] = useState(false)

  const { data: pendingInvites, isLoading: isPendingInvitesLoading } = useQuery(
    {
      queryKey: ['pending-invites'],
      queryFn: doGetUserPendingInvites,
      enabled: isOpen,
    },
  )

  const handleAcceptInvite = async ({ inviteId }: { inviteId: string }) => {
    await doAcceptOrgInvite({
      inviteId,
    })

    queryClient.invalidateQueries({
      queryKey: ['pending-invites'],
    })
  }

  const handleDeclineInvite = async ({ inviteId }: { inviteId: string }) => {
    await doDeclineOrgInvite({
      inviteId,
    })

    queryClient.invalidateQueries({
      queryKey: ['pending-invites'],
    })
  }

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button size="icon" variant="ghost">
          <LucideMailPlus className="size-4" />

          <span className="sr-only">Pending invites</span>
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-80 space-y-4">
        {isPendingInvitesLoading && (
          <LucideLoader2 className="mx-auto size-4 animate-spin text-foreground" />
        )}

        {!isPendingInvitesLoading && pendingInvites?.invites.length === 0 && (
          <span className="text-sm text-muted-foreground">
            No invites found.
          </span>
        )}

        {!isPendingInvitesLoading &&
          pendingInvites &&
          pendingInvites?.invites.length > 0 && (
            <>
              <span className="block text-sm font-medium">
                Pending Invites ({pendingInvites?.invites.length ?? 0})
              </span>

              {pendingInvites?.invites.map((invite) => {
                return (
                  <div className="space-y-2.5" key={invite.id}>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      <span className="font-medium text-foreground">
                        {invite.author?.name ?? 'Someone'}
                      </span>{' '}
                      invited you to join{' '}
                      <span className="font-medium text-foreground">
                        {invite.organization.name}
                      </span>{' '}
                      <span>{dayjs(invite.createdAt).fromNow()}</span>
                    </p>

                    <div className="flex gap-1">
                      <Button
                        onClick={() =>
                          handleAcceptInvite({ inviteId: invite.id })
                        }
                        size="xs"
                        variant="outline"
                      >
                        <LucideCheck className="mr-1.5 size-3" />
                        Accept
                      </Button>

                      <Button
                        size="xs"
                        variant="ghost"
                        className="text-muted-foreground"
                        onClick={() =>
                          handleDeclineInvite({ inviteId: invite.id })
                        }
                      >
                        <LucideX className="mr-1.5 size-3" />
                        Decline
                      </Button>
                    </div>
                  </div>
                )
              })}
            </>
          )}
      </PopoverContent>
    </Popover>
  )
}
