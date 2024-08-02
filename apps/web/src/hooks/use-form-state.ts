// since useActionState doesn't have till now a option to disable auto form cleanup, this custom is used instead

import { type FormEvent, useState, useTransition } from 'react'
import { requestFormReset } from 'react-dom'

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

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const data = new FormData(event.currentTarget)
    const form = event.currentTarget

    startTransition(async () => {
      const result = await action(data)

      if (result.success === true && onSuccess) {
        await onSuccess()
      }

      setFormState(result)
    })

    requestFormReset(form)
  }

  return [formState, handleSubmit, isPending] as const
}
