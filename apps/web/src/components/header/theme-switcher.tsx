'use client'

import { LucideMoon, LucideSun } from 'lucide-react'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

import { Skeleton } from '../skeleton'
import { Button } from '../ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu'

export const ThemeSwitcher = () => {
  const [mounted, setIsMounted] = useState(false)
  const { setTheme, resolvedTheme } = useTheme()

  useEffect(() => {
    setIsMounted(true)
  }, [])

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            {mounted && resolvedTheme ? (
              <>
                {resolvedTheme === 'light' && <LucideSun className="size-4" />}
                {resolvedTheme === 'dark' && <LucideMoon className="size-4" />}
              </>
            ) : (
              <Skeleton className="size-4" />
            )}

            <span className="sr-only">Toggle theme</span>
          </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme('light')}>
          Light
        </DropdownMenuItem>

        <DropdownMenuItem onClick={() => setTheme('dark')}>
          Dark
        </DropdownMenuItem>

        <DropdownMenuItem onClick={() => setTheme('system')}>
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
