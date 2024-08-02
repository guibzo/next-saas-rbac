import { Header } from '@/components/header'
import { Tabs } from '@/components/tabs'

export default function OrgLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Header />
      <Tabs />

      <main className="mx-auto w-full max-w-[1200px] py-4">{children}</main>
    </div>
  )
}
