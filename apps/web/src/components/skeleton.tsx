import type { HTMLAttributes } from 'react'

import { cn } from '@/lib/utils'

export const Skeleton = ({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className={cn('animate-pulse rounded-md bg-neutral-800', className)}
      {...props}
    />
  )
}
