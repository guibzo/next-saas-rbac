import { LucideInbox } from 'lucide-react'

import { ability } from '@/auth/get-ability'
import { getCurrentOrganizationSlug } from '@/auth/get-current-organization'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table'
import { doGetOrganizationInvites } from '@/http/do-get-organization-invites'

import { CreateInviteForm } from './create-invite-form'
import { RevokeInviteButton } from './revoke-invite-button'

export const Invites = async () => {
  const permissions = await ability()
  const currentOrg = getCurrentOrganizationSlug()
  const { invites } = await doGetOrganizationInvites(currentOrg!)

  return (
    <div className="space-y-4">
      {permissions?.can('create', 'Invite') && (
        <Card>
          <CardHeader>
            <CardTitle>Invite member</CardTitle>
          </CardHeader>

          <CardContent>
            <CreateInviteForm />
          </CardContent>
        </Card>
      )}

      <div className="space-y-2">
        <h2 className="text-lg font-semibold">Invites</h2>

        <div className="rounded border">
          <Table>
            <TableBody>
              {invites.length > 0 &&
                invites.map((invite) => {
                  const formattedRoleName =
                    invite.role.charAt(0).toUpperCase() +
                    invite.role.slice(1).toLowerCase()

                  return (
                    <TableRow key={invite.id}>
                      <TableCell className="py-2.5">
                        <span className="text-muted-foreground">
                          {invite.email}
                        </span>
                      </TableCell>

                      <TableCell className="py-2.5 font-medium">
                        {formattedRoleName}
                      </TableCell>

                      <TableCell className="py-2.5">
                        <div className="flex justify-end">
                          {permissions?.can('delete', 'Invite') && (
                            <RevokeInviteButton inviteId={invite.id} />
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  )
                })}

              {invites.length === 0 && (
                <TableRow>
                  <TableCell>
                    <div className="flex flex-col items-center justify-center gap-3 p-4 text-muted-foreground">
                      <LucideInbox className="size-10" />
                      No invites found
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  )
}
