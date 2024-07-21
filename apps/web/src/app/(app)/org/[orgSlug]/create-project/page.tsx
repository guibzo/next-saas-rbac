import { redirect } from 'next/navigation'

import { ability } from '@/auth/get-ability'
import { Header } from '@/components/header'

import { ProjectForm } from './project-form'

export default async function CreateProjectPage() {
  const permissions = await ability()

  if (permissions?.cannot('create', 'Project')) {
    redirect('/')
  }

  return (
    <>
      <Header />

      <main className="mx-auto w-full max-w-[1200px] space-y-4">
        <h1 className="text-2xl font-bold ">Create project</h1>

        <ProjectForm />
      </main>
    </>
  )
}
