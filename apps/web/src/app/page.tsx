import { auth } from '@/auth/auth'

export default async function Home() {
  const { user } = await auth()

  return (
    <>
      <pre>{JSON.stringify(user, null, 2)}</pre>
      <h1 className="text-3xl">Hello world!</h1>
    </>
  )
}
