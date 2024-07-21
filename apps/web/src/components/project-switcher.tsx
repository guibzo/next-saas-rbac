'use client'

import { useQuery } from '@tanstack/react-query'
import { LucideChevronsUpDown, LucidePlusCircle } from 'lucide-react'
import Link from 'next/link'
import { useParams } from 'next/navigation'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { doGetProjects } from '@/http/do-get-projects'
import { cn } from '@/lib/utils'

import { Skeleton } from './ui/skeleton'

export const ProjectSwitcher = () => {
  const { orgSlug, projectSlug } = useParams<{
    orgSlug: string
    projectSlug: string
  }>()

  const { data: projectsResponse, isLoading: isProjectsLoading } = useQuery({
    queryKey: [orgSlug, 'projects'],
    queryFn: () => doGetProjects(orgSlug),
    enabled: Boolean(orgSlug),
  })

  const currentProject =
    projectsResponse && projectSlug
      ? projectsResponse.projects.find(
          (project) => project.slug === projectSlug,
        )
      : null

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex w-[220px] items-center gap-2 rounded p-1 text-sm font-medium outline-none focus-visible:ring-2 focus-visible:ring-primary">
        {isProjectsLoading ? (
          <>
            <Skeleton className="size-4 rounded-full" />
            <Skeleton className="h-4 w-full flex-1" />
          </>
        ) : (
          <>
            {!isProjectsLoading && currentProject ? (
              <>
                <Avatar className="size-4">
                  {currentProject.avatarUrl && (
                    <AvatarImage src={currentProject.avatarUrl} />
                  )}
                  <AvatarFallback />
                </Avatar>

                <span className="truncate text-left">
                  {currentProject.name}
                </span>
              </>
            ) : (
              <span className="text-muted-foreground">Select project</span>
            )}
          </>
        )}

        <LucideChevronsUpDown
          className={cn(
            'ml-auto size-4 shrink-0 text-muted-foreground',
            isProjectsLoading && 'animate-pulse text-neutral-700',
          )}
        />
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        alignOffset={-16}
        sideOffset={12}
        className="w-[252px]"
      >
        <DropdownMenuGroup>
          <DropdownMenuLabel>Projects</DropdownMenuLabel>

          {projectsResponse &&
            projectsResponse.projects.map((project) => {
              return (
                <DropdownMenuItem key={project.id} asChild>
                  <Link href={`/org/${orgSlug}/project/${project.slug}`}>
                    <Avatar className="mr-2 size-4">
                      {project.avatarUrl && (
                        <AvatarImage src={project.avatarUrl} />
                      )}
                      <AvatarFallback />
                    </Avatar>

                    <span className="line-clamp-1">{project.name}</span>
                  </Link>
                </DropdownMenuItem>
              )
            })}
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuItem asChild>
          <Link href={`/org/${orgSlug}/create-project`}>
            <LucidePlusCircle className="mr-2 size-4" />
            Create new
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
