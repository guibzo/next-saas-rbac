'use server'

import { HTTPError } from 'ky'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { z } from 'zod'

import { doAcceptInvite } from '@/http/do-accept-invite'
import { doSignInWithEmailAndPassword } from '@/http/do-sign-in-with-email-and-password'

const signInSchema = z.object({
  email: z.string().email('Please, provide a valid e-mail address.'),
  password: z
    .string()
    .min(6, 'Please, provide a password with at least 6 characters.'),
})

export async function signInWithEmailAndPasswordAction(data: FormData) {
  const result = signInSchema.safeParse(Object.fromEntries(data))

  if (!result.success) {
    const errors = result.error.flatten().fieldErrors

    return {
      success: false,
      message: null,
      errors,
    }
  }

  const { email, password } = result.data

  try {
    const { token } = await doSignInWithEmailAndPassword({
      email,
      password,
    })

    cookies().set('token', token, {
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: '/',
    })

    const inviteId = cookies().get('inviteId')?.value

    if (inviteId) {
      try {
        await doAcceptInvite({ inviteId })

        cookies().delete('inviteId')
      } catch {}
    }
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

  redirect('/')
}
