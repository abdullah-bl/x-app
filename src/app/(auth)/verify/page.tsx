import { revalidatePath, revalidateTag } from "next/cache"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { getUserDate } from "~/lib/auth"
import client from "~/lib/client"

export default async function VerifyPage() {
  const user = await getUserDate()

  const refresh = async () => {
    "use server"
    client.authStore.clear()
    cookies().delete("pb_auth")
    revalidatePath("/")
    redirect("/")
  }

  // if (!user) redirect("/")

  return (
    <div className="grid gap-4 place-items-center items-center min-h-screen">
      <div className="grid gap-4 place-content-center place-items-center">
        <h4>Hello, {user?.name}</h4>
        <h3 className="text-2xl font-bold">Verify your Account</h3>
        <p className="text-lg">
          You must verify your account before you can access the app.
        </p>
        <form action={refresh}>
          <button type="submit">Try again</button>
        </form>
      </div>
    </div>
  )
}
