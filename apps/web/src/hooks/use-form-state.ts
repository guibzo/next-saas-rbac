// since useActionState doesn't have till now a option to disable auto form cleanup, this custom is used instead

import { type FormEvent, useState, useTransition } from 'react'

type FormState = {
  success: boolean
  message: string | null
  errors: Record<string, string[]> | null
}

export const useFormState = (
  action: (data: FormData) => Promise<FormState>,
  onSuccess?: () => Promise<void> | void,
  initialState?: FormState,
) => {
  const [isPending, startTransition] = useTransition()

  const [formState, setFormState] = useState<FormState>(
    initialState ?? {
      success: false,
      message: null,
      errors: null,
    },
  )

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const data = new FormData(e.currentTarget)

    startTransition(async () => {
      const result = await action(data)

      if (result.success === true && onSuccess) {
        await onSuccess()
      }

      setFormState(result)
    })
  }

  return [formState, handleSubmit, isPending] as const
}
