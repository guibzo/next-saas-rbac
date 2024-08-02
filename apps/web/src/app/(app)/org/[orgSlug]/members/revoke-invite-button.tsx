import { LucideXOctagon } from 'lucide-react'
import type { ComponentProps } from 'react'

import { Button } from '@/components/ui/button'

import { revokeInviteAction } from './actions'

interface RevokeInviteButtonProps extends ComponentProps<typeof Button> {
  inviteId: string
}

export const RevokeInviteButton = ({
  inviteId,
  ...props
}: RevokeInviteButtonProps) => {
  return (
    <form
      action={revokeInviteAction.bind(null, {
        inviteId,
      })}
    >
      <Button {...props} size="sm" type="submit" variant="destructive">
        <LucideXOctagon className="mr-2 size-4" />
        Revoke invite
      </Button>
    </form>
  )
}
