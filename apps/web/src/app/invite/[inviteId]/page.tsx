import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { LucideCheckCircle, LucideLogIn, LucideLogOut } from 'lucide-react'
import { cookies } from 'next/headers'
import Link from 'next/link'
import { redirect } from 'next/navigation'

import { getUserProfile } from '@/auth/get-user-profile'
import { isAuthenticated } from '@/auth/is-authenticated'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { doAcceptOrgInvite } from '@/http/do-accept-org-invite'
import { doGetInviteDetails } from '@/http/do-get-invite-details'

dayjs.extend(relativeTime)

type InvitePageProps = {
  params: {
    inviteId: string
  }
}

export default async function InvitePage({ params }: InvitePageProps) {
  const inviteId = params.inviteId

  const { invite } = await doGetInviteDetails(inviteId)
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

    await doAcceptOrgInvite({ inviteId })

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

        {isUserAuthenticated && !isUserAuthenticatedWithSameEmailAsInvite && (
          <div className="space-y-4">
            <p className="text-balance text-center leading-relaxed text-muted-foreground">
              This invite was sent to
              <span className="font-medium text-foreground">
                {invite.email}
              </span>{' '}
              but you are currenctly authenticated as
              <span className="font-medium text-foreground">
                {currentUser?.email}
              </span>
              .
            </p>

            <div className="space-y-2">
              <Button className="w-full" variant="secondary" asChild>
                {/* a because Link would prefetch */}
                <a href="/api/auth/sign-out">
                  <LucideLogOut className="mr-2 size-4" />
                  Sign out
                </a>
              </Button>

              <Button className="w-full" variant="outline" asChild>
                <Link href="/">Back to dashboard</Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
