import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Project Details',
}

export default function ProjectPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold ">Project page</h1>
    </div>
  )
}
