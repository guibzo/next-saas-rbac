'use server'

import { HTTPError } from 'ky'
import { z } from 'zod'

import { getCurrentOrganization } from '@/auth/get-current-organization'
import { doCreateProject } from '@/http/do-create-projectg'

const projectSchema = z.object({
  name: z.string().min(4, 'Please, include at least 4 characters.'),
  description: z.string(),
})

export async function createProjectAction(data: FormData) {
  const result = projectSchema.safeParse(Object.fromEntries(data))

  if (!result.success) {
    const errors = result.error.flatten().fieldErrors

    return {
      success: false,
      message: null,
      errors,
    }
  }

  const { name, description } = result.data

  try {
    await doCreateProject({
      orgSlug: getCurrentOrganization()!,
      name,
      description,
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
    message: 'Successfully saved project.',
    errors: null,
  }
}
