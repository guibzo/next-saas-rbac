import { organizationSchema } from '@saas/auth'
import {
  LucideArrowLeftRight,
  LucideCrown,
  LucideInbox,
  LucideUserMinus,
} from 'lucide-react'

import { ability } from '@/auth/get-ability'
import { getCurrentOrganizationSlug } from '@/auth/get-current-organization'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table'
import { doGetMembership } from '@/http/do-get-membership'
import { doGetOrganization } from '@/http/do-get-organization'
import { doGetOrganizationMembers } from '@/http/do-get-organization-members'

import { removeMemberAction } from './actions'
import { SelectMemberRole } from './select-member-role'

export const MembersList = async () => {
  const currentOrg = getCurrentOrganizationSlug()
  const permissions = await ability()

  const [{ membership }, { members }, { organization }] = await Promise.all([
    doGetMembership(currentOrg!),
    doGetOrganizationMembers(currentOrg!),
    doGetOrganization({ orgSlug: currentOrg! }),
  ])

  const authOrganization = organizationSchema.parse(organization)

  return (
    <div className="space-y-2">
      <h2 className="text-lg font-semibold">Members</h2>

      <div className="rounded border">
        <Table>
          <TableBody>
            {members.length > 0 &&
              members.map((member) => {
                const isCurrentMember = membership?.userId === member.userId
                const isCurrentOrganizationOwner =
                  organization.ownerId === member.userId
                const isUserAllowedToChangeRoles = permissions?.cannot(
                  'update',
                  'User',
                )

                return (
                  <TableRow key={member.id}>
                    <TableCell className="w-12 py-2.5">
                      <Avatar className="size-8">
                        <AvatarFallback />
                        {member.avatarUrl && (
                          <AvatarImage
                            src={member.avatarUrl}
                            className="aspect-square size-8"
                          />
                        )}
                      </Avatar>
                    </TableCell>

                    <TableCell className="py-2.5">
                      <div className="flex flex-col">
                        <span className="inline-flex items-center gap-2 font-semibold">
                          {member.name}

                          {isCurrentMember && (
                            <Badge variant="secondary" className="text-xs">
                              Me
                            </Badge>
                          )}

                          {isCurrentOrganizationOwner && (
                            <Badge
                              variant="secondary"
                              className="inline-flex items-center gap-1 text-xs"
                            >
                              <LucideCrown className="size-3 fill-foreground" />
                              Owner
                            </Badge>
                          )}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {member.email}
                        </span>
                      </div>
                    </TableCell>

                    <TableCell className="py-2.5">
                      <div className="flex items-center justify-end gap-2">
                        {permissions?.can(
                          'transfer_ownership',
                          authOrganization,
                        ) && (
                          <Button
                            size="sm"
                            variant="ghost"
                            disabled={
                              isCurrentOrganizationOwner || isCurrentMember
                            }
                          >
                            <LucideArrowLeftRight className="mr-2 size-4" />
                            Transfer ownership
                          </Button>
                        )}

                        <SelectMemberRole
                          memberId={member.id}
                          value={member.role}
                          disabled={
                            isCurrentMember ||
                            isCurrentOrganizationOwner ||
                            isUserAllowedToChangeRoles
                          }
                        />

                        {permissions?.can('delete', 'User') && (
                          <form
                            action={removeMemberAction.bind(null, {
                              memberId: member.id,
                              // bind so we can assign params in a way that don't call the function, which isn't allowed by Next in relation CS -> SS
                            })}
                          >
                            <Button
                              disabled={
                                isCurrentMember || isCurrentOrganizationOwner
                              }
                              type="submit"
                              size="sm"
                              variant="destructive"
                            >
                              <LucideUserMinus className="mr-2 size-4" />
                              Remove
                            </Button>
                          </form>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                )
              })}

            {members.length === 0 && (
              <TableRow>
                <TableCell>
                  <div className="flex flex-col items-center justify-center gap-3 p-4 text-muted-foreground">
                    <LucideInbox className="size-10" />
                    No members found
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
