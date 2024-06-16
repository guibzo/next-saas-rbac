import { LucideChevronsUpDown, LucidePlusCircle } from 'lucide-react'
import { cookies } from 'next/headers'
import Link from 'next/link'

import { doGetOrganization } from '@/http/do-get-organizations'

import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'

export const OrganizationSwitcher = async () => {
  const currentOrg = cookies().get('@saas:org')?.value
  const { organizations } = await doGetOrganization()

  const currentOrganization = organizations.find(
    (org) => org.slug === currentOrg,
  )

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex w-[220px] items-center gap-2 rounded p-1 text-sm font-medium outline-none focus-visible:ring-2 focus-visible:ring-primary">
        {currentOrganization ? (
          <>
            <Avatar className="mr-2 size-4">
              {currentOrganization.avatarUrl && (
                <AvatarImage src={currentOrganization.avatarUrl} />
              )}
              <AvatarFallback />
            </Avatar>

            <span className="truncate text-left">
              {currentOrganization.name}
            </span>
          </>
        ) : (
          <span className="text-muted-foreground">Select organization</span>
        )}

        <LucideChevronsUpDown className="ml-auto size-4 text-muted-foreground" />
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        alignOffset={-16}
        sideOffset={12}
        className="w-[252px]"
      >
        <DropdownMenuGroup>
          <DropdownMenuLabel>Organizations</DropdownMenuLabel>

          {organizations.map((organization) => {
            return (
              <DropdownMenuItem key={organization.id} asChild>
                <Link href={`/org/${organization.slug}`}>
                  <Avatar className="mr-2 size-4">
                    {organization.avatarUrl && (
                      <AvatarImage src={organization.avatarUrl} />
                    )}
                    <AvatarFallback />
                  </Avatar>

                  <span className="line-clamp-1">{organization.name}</span>
                </Link>
              </DropdownMenuItem>
            )
          })}
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuItem asChild>
          <Link href="/create-organization">
            <LucidePlusCircle className="mr-2 size-4" />
            Create new
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
