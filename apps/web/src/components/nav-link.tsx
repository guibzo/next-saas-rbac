'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import type { ComponentProps } from 'react'

interface NavLinkProps extends ComponentProps<typeof Link> {}

export const NavLink = (props: NavLinkProps) => {
  const pathname = usePathname()

  const isCurrentActiveLink = props.href.toString() === pathname

  return <Link data-current={isCurrentActiveLink} {...props} />
}
