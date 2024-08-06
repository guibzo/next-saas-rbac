import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { LucideCheckCircle, LucideLogIn } from 'lucide-react'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import { getUserProfile } from '@/auth/get-user-profile'
import { isAuthenticated } from '@/auth/is-authenticated'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { doAcceptInvite } from '@/http/do-accept-invite'
import { doGetInvite } from '@/http/do-get-invite'

dayjs.extend(relativeTime)

type InvitePageProps = {
  params: {
    inviteId: string
  }
}

export default async function InvitePage({ params }: InvitePageProps) {
  const inviteId = params.inviteId

  const { invite } = await doGetInvite(inviteId)
  const isUserAuthenticated = isAuthenticated()

  let currentUser = null

  if (isUserAuthenticated) {
    const { user } = await getUserProfile()

    currentUser = user
  }

  const isUserAuthenticatedWithSameEmailAsInvite =
    currentUser?.email === invite.email

  const signInFromInviteAction = async () => {
    'use server'

    cookies().set('inviteId', inviteId)

    redirect(`/auth/sign-in?email=${invite.email}`)
  }

  const acceptInviteAction = async () => {
    'use server'

    await doAcceptInvite({ inviteId })

    redirect('/')
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4">
      <div className="flex w-full max-w-sm flex-col justify-center space-y-6">
        <div className="flex flex-col items-center space-y-4">
          <Avatar className="size-16">
            {invite.author?.avatarUrl && (
              <AvatarImage src={invite.author.avatarUrl} />
            )}
            <AvatarFallback />
          </Avatar>

          <div className="flex flex-col items-center gap-3 text-muted-foreground">
            <p className="text-balance text-center leading-relaxed">
              <span className="font-medium text-foreground">
                {invite.author?.name ?? 'Someone'}
              </span>{' '}
              invited you to join{' '}
              <span className="font-medium text-foreground">
                {invite.organization.name}
              </span>
            </p>

            <span className="text-xs text-muted-foreground">
              {dayjs(invite.createdAt).fromNow()}
            </span>
          </div>
        </div>

        <Separator />

        {!isUserAuthenticated && (
          <form action={signInFromInviteAction}>
            <Button type="submit" variant="secondary" className="w-full">
              <LucideLogIn className="mr-2 size-4" />
              Sign in to accept the invite
            </Button>
          </form>
        )}

        {isUserAuthenticatedWithSameEmailAsInvite && (
          <form action={acceptInviteAction}>
            <Button type="submit" variant="secondary" className="w-full">
              <LucideCheckCircle className="mr-2 size-4" />
              Join {invite.organization.name}
            </Button>
          </form>
        )}
      </div>
    </div>
  )
}
