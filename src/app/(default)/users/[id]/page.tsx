import { redirect } from "next/navigation"
import client from "~/lib/client"

const getUserById = async (id: string) => {
  try {
    return await client.collection("users").getOne(id)
  } catch (error) {
    console.error(error)
    redirect("/")
  }
}

export default async function UserDetailsPage({
  params,
}: {
  params: { id: string }
}) {
  const user = await getUserById(params.id)

  return (
    <div className="grid gap-4">
      <h1>User Details</h1>
      <pre>{JSON.stringify(user, null, 2)}</pre>
    </div>
  )
}
