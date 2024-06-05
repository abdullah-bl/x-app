import { getUserFromCookies } from "~/lib/auth"
import SideBar from "./sidebar"

export default async function PageLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const user = await getUserFromCookies()

  return (
    <main className="min-w-screen min-h-screen overflow-hidden flex gap-1">
      {user ? <SideBar user={user} /> : null}
      <div className="flex-1 overflow-scroll h-screen p-4">{children}</div>
    </main>
  )
}
