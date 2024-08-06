import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { LucideArrowRight } from 'lucide-react'

import { getCurrentOrganizationSlug } from '@/auth/get-current-organization'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { doGetProjects } from '@/http/do-get-projects'

dayjs.extend(relativeTime)

export const ProjectList = async () => {
  const currentOrg = getCurrentOrganizationSlug()
  const { projects } = await doGetProjects(currentOrg!)

  return (
    <div className="grid grid-cols-3 gap-4">
      {projects.map((project) => {
        return (
          <Card key={project.id} className="flex flex-col justify-between">
            <CardHeader>
              <CardTitle className="text-xl">{project.name}</CardTitle>
              <CardDescription className="line-clamp-2 text-ellipsis leading-relaxed">
                {project.description}
              </CardDescription>
            </CardHeader>

            <CardFooter className="flex items-center gap-1.5">
              <Avatar className="size-5">
                {project.owner.avatarUrl && (
                  <AvatarImage src={project.owner.avatarUrl} />
                )}
                <AvatarFallback />
              </Avatar>

              <div className="truncate text-xs text-muted-foreground">
                <span className="font-semibold text-foreground">
                  {project.owner.name}
                </span>{' '}
                {dayjs(project.createdAt).fromNow()}
              </div>

              <Button size="xs" className="ml-auto" variant="outline">
                View <LucideArrowRight className="ml-2 size-3" />
              </Button>
            </CardFooter>
          </Card>
        )
      })}
    </div>
  )
}
