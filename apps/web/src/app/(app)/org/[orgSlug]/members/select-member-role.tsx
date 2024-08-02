'use client'

import { type Role } from '@saas/auth'
import type { ComponentProps } from 'react'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { formatRoleName } from '@/utils/format-role-name'
import { getRolesList } from '@/utils/get-roles-list'

import { updateMemberAction } from './actions'

interface SelectMemberRoleProps extends ComponentProps<typeof Select> {
  memberId: string
}

export const SelectMemberRole = ({
  memberId,
  ...props
}: SelectMemberRoleProps) => {
  const rolesList = getRolesList()

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
          return (
            <SelectItem key={role} value={role}>
              {formatRoleName(role)}
            </SelectItem>
          )
        })}
      </SelectContent>
    </Select>
  )
}
