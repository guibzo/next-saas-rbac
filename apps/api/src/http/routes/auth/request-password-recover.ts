import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'

import { prisma } from '@/lib/prisma'

export const requestPasswordRecover = async (app: FastifyInstance) => {
  app.withTypeProvider<ZodTypeProvider>().post(
    '/password/recover',
    {
      schema: {
        tags: ['auth'],
        summary: 'Request password recover.',
        body: z.object({
          email: z.string().email(),
        }),
        response: {
          201: z.null(),
        },
      },
    },
    async (request, reply) => {
      const { email } = request.body

      const userFromEmail = await prisma.user.findFirst({
        where: {
          email,
        },
      })

      if (!userFromEmail) {
        // we don't want people to know if user really exists
        return reply.status(201).send()
      }

      const { id: code } = await prisma.token.create({
        data: {
          type: 'PASSWORD_RECOVER',
          userId: userFromEmail.id,
        },
      })

      // TO-DO: send e-mail w/ password recover link
      console.log(`Recover password token: ${code}`)

      return reply.status(201).send()
    },
  )
}
