import { LucideLoader2 } from 'lucide-react'

export const LoaderIndicator = () => {
  return (
    <div className="flex items-center gap-2">
      <LucideLoader2 className="size-4 animate-spin" />
      <span>Carregando...</span>
    </div>
  )
}
