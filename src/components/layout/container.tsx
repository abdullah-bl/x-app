export default function Container({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <div className="grid gap-6 max-w-6xl mx-auto flex-1">{children}</div>
}
