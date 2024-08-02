import { LucideXCircle } from 'lucide-react'
import { redirect } from 'next/navigation'

import { getCurrentOrganizationSlug } from '@/auth/get-current-organization'
import { Button } from '@/components/ui/button'
import { doShutdownOrganization } from '@/http/do-shutdown-organization'

export const ShutdownOrganizationButton = () => {
  const shutdownOrganization = async () => {
    'use server'

    const currentOrg = getCurrentOrganizationSlug()

    await doShutdownOrganization({ orgSlug: currentOrg! })

    redirect('/')
  }

  return (
    <form action={shutdownOrganization}>
      <Button type="submit" variant="destructive" className="w-56">
        <LucideXCircle className="mr-2 size-4" />
        Shutdown organization
      </Button>
    </form>
  )
}
