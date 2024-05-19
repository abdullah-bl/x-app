import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Login",
  description: "Sign in to your account.",
}

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <main>{children}</main>
}
