import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'

import { authMiddleware } from '@/http/middlewares/auth'
import { prisma } from '@/lib/prisma'
import { getUserPermissions } from '@/utils/get-user-permissions'

import { BadRequestError } from '../@errors/bad-request-error'

export const createProject = async (app: FastifyInstance) => {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(authMiddleware)
    .post(
      '/organization/:slug/projects',
      {
        schema: {
          tags: ['projects'],
          summary: 'Create a new project on an organization.',
          security: [{ bearerAuth: [] }],
          body: z.object({
            name: z.string(),
            description: z.string(),
          }),
          params: z.object({
            slug: z.string(),
          }),
          response: {
            201: z.object({
              projectId: z.string().uuid(),
            }),
          },
        },
      },
      async (request, reply) => {
        const { description, name } = request.body
        const { slug } = request.params

        const { membership, organization } =
          await request.getUserMembership(slug)
        const userId = await request.getCurrentUserId()

        const { cannot } = getUserPermissions(userId, membership.role)

        if (cannot('create', 'Project')) {
          throw new BadRequestError(
            'You do not have permission to create a project.',
          )
        }

        const project = await prisma.project.createWithSlug({
          data: {
            name,
            description,
            organizationId: organization.id,
            ownerId: userId,
          },
          sourceField: 'name',
          targetField: 'slug',
          unique: true,
        })

        return reply.status(201).send({
          projectId: project.id,
        })
      },
    )
}
