import type { Metadata } from 'next'
import { redirect } from 'next/navigation'

import { ability } from '@/auth/get-ability'

import { ProjectForm } from './project-form'

export const metadata: Metadata = {
  title: 'Create New Project',
}

export default async function CreateProjectPage() {
  const permissions = await ability()

  if (permissions?.cannot('create', 'Project')) {
    redirect('/')
  }

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold ">Create project</h1>

      <ProjectForm />
    </div>
  )
}
