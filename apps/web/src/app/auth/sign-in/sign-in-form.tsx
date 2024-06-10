'use client'

import { LucideAlertTriangle } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { type FormEvent, useState, useTransition } from 'react'

import githubIcon from '@/assets/github-icon.svg'
import { LoaderIndicator } from '@/components/loader-indicator'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'

import { signInWithEmailAndPassword } from './actions'

type FormState = {
  success: boolean
  message: string | null
  errors: Record<string, string[]> | null
}

export const SignInForm = () => {
  // for now, this was unused because react don't have a option to disable auto form reset upon submit errors
  // const [state, formAction, isPending] = useActionState(
  //   signInWithEmailAndPassword,
  //   { success: false, message: null, errors: null },
  // )

  const [isAuthenticating, startTransition] = useTransition()

  const [formState, setFormState] = useState<FormState>({
    success: false,
    message: null,
    errors: null,
  })

  const handleSignIn = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const data = new FormData(e.currentTarget)

    startTransition(async () => {
      const result = await signInWithEmailAndPassword(data)
      setFormState(result)
    })
  }

  return (
    <form onSubmit={handleSignIn} className="space-y-4">
      {formState.success === false && formState.message && (
        <Alert variant="destructive">
          <LucideAlertTriangle className="size-4" />

          <AlertTitle>Sign in failed!</AlertTitle>
          <AlertDescription>
            <p>{formState.message}</p>
          </AlertDescription>
        </Alert>
      )}

      <div className="space-y-1">
        <Label htmlFor="email">E-mail</Label>
        <Input name="email" id="email" type="email" />

        {formState.errors?.email && (
          <p className="text-xs font-medium text-red-500 dark:text-red-400">
            {formState.errors.email[0]}
          </p>
        )}
      </div>

      <div className="space-y-1">
        <Label htmlFor="password">Password</Label>
        <Input name="password" id="password" type="password" />

        {formState.errors?.password && (
          <p className="text-xs font-medium text-red-500 dark:text-red-400">
            {formState.errors.password[0]}
          </p>
        )}

        <Link
          href="/auth/forgot-password"
          className="text-xs font-medium text-foreground hover:underline"
        >
          Forgot your password?
        </Link>
      </div>

      <Button type="submit" className="w-full" disabled={isAuthenticating}>
        {isAuthenticating ? <LoaderIndicator /> : 'Sign in with e-mail'}
      </Button>

      <Button variant="link" asChild className="w-full">
        <Link href="/auth/sign-up">Create new account</Link>
      </Button>

      <Separator />

      <Button type="submit" variant="outline" className="w-full">
        <Image src={githubIcon} alt="" className="mr-2 size-4 dark:invert" />
        Sign in with GitHub
      </Button>
    </form>
  )
}
