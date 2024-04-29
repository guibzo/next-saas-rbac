import { z } from 'zod'

// we wont put all the entity db tables on here. just the properties we need for permissions (e.g. conditionals)
export const projectSchema = z.object({
  __typename: z.literal('Project').default('Project'),
  id: z.string(),
  ownerId: z.string(),
})

export type Project = z.infer<typeof projectSchema>
