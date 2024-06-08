import Link from 'next/link'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export default function ForgotPasswordPage() {
  return (
    <form className="space-y-4">
      <div className="space-y-1">
        <Label htmlFor="email">E-mail</Label>
        <Input name="email" id="email" type="email" />
      </div>

      <Button type="submit" className="w-full">
        Recover password
      </Button>

      <Button variant="link" asChild className="w-full">
        <Link href="/auth/sign-in">Sign in instead</Link>
      </Button>
    </form>
  )
}
