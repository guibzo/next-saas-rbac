'use server'

import { HTTPError } from 'ky'
import { z } from 'zod'

import { doCreateOrganization } from '@/http/do-create-organization'

const organizationSchema = z
  .object({
    name: z.string().min(4, 'Please, include at least 4 characters.'),
    domain: z
      .string()
      .nullable()
      .refine((value) => {
        if (value) {
          const domainRegex = /^[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$/
          return domainRegex.test(value)
        }
        return true
      }, 'Please, provide a valid domain.'),
    shouldAttachUsersByDomain: z
      .union([z.literal('on'), z.literal('off'), z.boolean()])
      .transform((value) => {
        if (value === true || value === 'on') {
          return true
        }
      })
      .default(false),
  })
  .refine(
    (data) => {
      if (data.shouldAttachUsersByDomain === true && !data.domain) {
        return false
      }
      return true
    },
    {
      message: 'Domain is required when auto-join is enabled.',
      path: ['domain'],
    },
  )

export async function createOrganizationAction(data: FormData) {
  const result = organizationSchema.safeParse(Object.fromEntries(data))

  if (!result.success) {
    const errors = result.error.flatten().fieldErrors

    return {
      success: false,
      message: null,
      errors,
    }
  }

  const { name, domain, shouldAttachUsersByDomain } = result.data

  try {
    await doCreateOrganization({
      name,
      domain,
      shouldAttachUsersByDomain,
    })
  } catch (err) {
    if (err instanceof HTTPError) {
      const { message } = await err.response.json()

      return { success: false, message, errors: null }
    }

    console.error(err)

    return {
      success: false,
      message: 'Unexpected error, try again in a few minutes.',
      errors: null,
    }
  }

  return {
    success: true,
    message: 'Successfully saved organization.',
    errors: null,
  }
}
