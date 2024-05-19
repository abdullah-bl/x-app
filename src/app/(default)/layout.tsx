import Navbar from "~/components/layout/navbar"

export default function PageLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <main className="mx-auto max-w-4xl flex flex-col gap-4 p-1 sm:p-2 min-h-screen">
      <Navbar />
      {children}
    </main>
  )
}
