import { redirect } from 'next/navigation'

import { isAuthenticated } from '@/auth/is-authenticated'

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  if (!isAuthenticated()) {
    redirect('/auth/sign-in')
  }

  return <>{children}</>
}
