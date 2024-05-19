import { getUserDate } from "~/lib/auth"

export default async function ProfilePage() {
  const user = await getUserDate()
  return (
    <div className="grid gap-4 h-full flex-1 place-items-center place-content-center">
      <h3 className=" font-extrabold text-3xl">/Profile</h3>
      <pre>{JSON.stringify(user, null, 2)}</pre>
    </div>
  )
}
