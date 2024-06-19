import { Header } from '@/components/header'

import { OrganizationForm } from './organization-form'

export default function CreateOrganizationPage() {
  return (
    <>
      <Header />

      <main className="mx-auto w-full max-w-[1200px] space-y-4">
        <h1 className="text-2xl font-bold ">Create organization</h1>

        <OrganizationForm />
      </main>
    </>
  )
}
