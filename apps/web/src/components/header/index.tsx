import { LucideCrown, LucideSlash } from 'lucide-react'

import { ability } from '@/auth/get-ability'

import { Separator } from '../ui/separator'
import { OrganizationSwitcher } from './organization-switcher'
import { ProfileButton } from './profile-button'
import { ThemeSwitcher } from './theme-switcher'

export const Header = async () => {
  const permissions = await ability()

  return (
    <div className="mx-auto flex max-w-[1200px] items-center justify-between">
      <div className="flex items-center gap-3">
        <LucideCrown className="size-6 text-zinc-950 dark:invert" />

        <LucideSlash className="size-3 -rotate-[24deg] text-border" />

        <OrganizationSwitcher />

        {permissions?.can('get', 'Project') && <p>Projetos</p>}
      </div>

      <div className="flex items-center gap-4">
        <ThemeSwitcher />

        <Separator orientation="vertical" className="h-5" />

        <ProfileButton />
      </div>
    </div>
  )
}
