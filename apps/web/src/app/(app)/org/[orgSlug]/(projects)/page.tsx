import { LucidePlus } from 'lucide-react'
import type { Metadata } from 'next'
import Link from 'next/link'

import { ability } from '@/auth/get-ability'
import { getCurrentOrganizationSlug } from '@/auth/get-current-organization'
import { Button } from '@/components/ui/button'

import { ProjectList } from './project-list'

export const metadata: Metadata = {
  title: 'Projects',
}

export default async function ProjectsPage() {
  const currentOrg = getCurrentOrganizationSlug()
  const permissions = await ability()

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold ">Organization projects</h1>

        {permissions?.can('create', 'Project') && (
          <Button size="sm" asChild>
            <Link href={`/org/${currentOrg}/create-project`}>
              <LucidePlus className="mr-2 size-4" />
              Create project
            </Link>
          </Button>
        )}
      </div>

      {permissions?.can('get', 'Project') ? (
        <ProjectList />
      ) : (
        <p className="text-sm text-muted-foreground">
          You are not allowed to see this organization projects.
        </p>
      )}
    </div>
  )
}
