"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useRouter } from "next/router"

export default function CustomLink({
  href,
  children,
}: {
  href: string
  children: React.ReactNode
}) {
  const pathname = usePathname()
  return (
    <Link
      href={href}
      className={`hover:bg-zinc-100 hover:dark:bg-zinc-800 p-1 px-2 rounded-lg ${
        pathname === href ? "bg-zinc-100 dark:bg-zinc-800" : ""
      }`}
    >
      {children}
    </Link>
  )
}
