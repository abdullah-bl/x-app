import Navbar from "~/components/layout/navbar"

export default function PageLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <main className="flex flex-col gap-4 p-1 sm:p-2 min-h-screen mx-auto max-w-4xl">
      <Navbar />
      <div className="flex-1">{children}</div>
    </main>
  )
}
