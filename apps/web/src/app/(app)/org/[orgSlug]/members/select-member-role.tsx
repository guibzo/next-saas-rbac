'use client'

import { type Role, roleSchema } from '@saas/auth'
import type { ComponentProps } from 'react'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

import { updateMemberAction } from './actions'

interface SelectMemberRoleProps extends ComponentProps<typeof Select> {
  memberId: string
}

export const SelectMemberRole = ({
  memberId,
  ...props
}: SelectMemberRoleProps) => {
  const rolesList = roleSchema.options.map((option) => option.value)

  const updateMemberRole = async (role: Role) => {
    await updateMemberAction({
      memberId,
      role,
    })
  }

  return (
    <Select onValueChange={updateMemberRole} {...props}>
      <SelectTrigger className="h-8 w-32">
        <SelectValue />
      </SelectTrigger>

      <SelectContent>
        {rolesList.map((role) => {
          const formattedRoleName =
            role.charAt(0).toUpperCase() + role.slice(1).toLowerCase()

          return <SelectItem value={role}>{formattedRoleName}</SelectItem>
        })}
      </SelectContent>
    </Select>
  )
}
