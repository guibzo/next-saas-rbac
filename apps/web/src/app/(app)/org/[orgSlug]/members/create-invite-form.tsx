'use client'

import {
  LucideAlertTriangle,
  LucideBadgeCheck,
  LucideUserPlus,
} from 'lucide-react'

import { LoaderIndicator } from '@/components/loader-indicator'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useFormState } from '@/hooks/use-form-state'
import { formatRoleName } from '@/utils/format-role-name'
import { getRolesList } from '@/utils/get-roles-list'

import { createInviteAction } from './actions'

export const CreateInviteForm = () => {
  const rolesList = getRolesList()

  const [{ errors, message, success }, handleSubmit, isSavingProject] =
    useFormState(createInviteAction)

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {success === false && message && (
        <Alert variant="destructive">
          <LucideAlertTriangle className="size-4" />

          <AlertTitle>Invite failed!</AlertTitle>
          <AlertDescription>
            <p>{message}</p>
          </AlertDescription>
        </Alert>
      )}

      {success === true && message && (
        <Alert variant="success">
          <LucideBadgeCheck className="size-4" />

          <AlertTitle>Success!</AlertTitle>
          <AlertDescription>
            <p>{message}</p>
          </AlertDescription>
        </Alert>
      )}

      <div className="flex items-center gap-2">
        <div className="flex-1 space-y-1">
          <Input name="email" id="email" placeholder="johndoe@example.com" />

          {errors?.email && (
            <p className="text-xs font-medium text-red-500 dark:text-red-400">
              {errors.email[0]}
            </p>
          )}
        </div>

        <Select name="role" defaultValue="MEMBER">
          <SelectTrigger className="w-32">
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

        <Button type="submit" disabled={isSavingProject}>
          {isSavingProject ? (
            <LoaderIndicator />
          ) : (
            <span className="inline-flex items-center">
              <LucideUserPlus className="mr-2 size-4" />
              Invite user
            </span>
          )}
        </Button>
      </div>
    </form>
  )
}
