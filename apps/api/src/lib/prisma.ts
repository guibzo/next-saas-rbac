import { PrismaClient } from '@prisma/client'
import { createWithSlugFn } from 'prisma-extension-create-with-slug'

export const prisma = new PrismaClient({
  log: ['query'],
}).$extends(createWithSlugFn())
