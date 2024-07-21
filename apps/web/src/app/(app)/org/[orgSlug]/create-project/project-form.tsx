'use client'

import { LucideAlertTriangle, LucideBadgeCheck } from 'lucide-react'
import { useParams } from 'next/navigation'

import { LoaderIndicator } from '@/components/loader-indicator'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { useFormState } from '@/hooks/use-form-state'
import { queryClient } from '@/lib/react-query'

import { createProjectAction } from './actions'

export const ProjectForm = () => {
  const { orgSlug } = useParams<{ orgSlug: string }>()

  const [{ errors, message, success }, handleSubmit, isSavingProject] =
    useFormState(createProjectAction, () =>
      queryClient.invalidateQueries({
        queryKey: [orgSlug, 'projects'],
      }),
    )

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {success === false && message && (
        <Alert variant="destructive">
          <LucideAlertTriangle className="size-4" />

          <AlertTitle>Save project failed!</AlertTitle>
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

      <div className="space-y-1">
        <Label htmlFor="name">Project name</Label>
        <Input name="name" id="name" />

        {errors?.name && (
          <p className="text-xs font-medium text-red-500 dark:text-red-400">
            {errors.name[0]}
          </p>
        )}
      </div>

      <div className="space-y-1">
        <Label htmlFor="description">Description</Label>
        <Textarea name="description" id="description" />

        {errors?.description && (
          <p className="text-xs font-medium text-red-500 dark:text-red-400">
            {errors.description[0]}
          </p>
        )}
      </div>

      <Button type="submit" className="w-full" disabled={isSavingProject}>
        {isSavingProject ? <LoaderIndicator /> : 'Save project'}
      </Button>
    </form>
  )
}
