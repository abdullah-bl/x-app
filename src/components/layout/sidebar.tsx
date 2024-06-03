"use client"

import { ModeToggle } from "./theme"
import {
  BackpackIcon,
  CalendarIcon,
  ExitIcon,
  FileIcon,
  ListBulletIcon,
  PaddingIcon,
  PersonIcon,
  PieChartIcon,
} from "@radix-ui/react-icons"
import { signOut } from "~/lib/auth"
import { Button } from "~/components/ui/button"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { User } from "~/types"
import { cn } from "~/lib/utils"

export default function SideBar({ user }: { user?: User | undefined }) {
  const currentYear = new Date().getFullYear()

  return (
    <aside className=" hidden lg:flex lg:w-[22%] flex-col h-screen p-2 border-x gap-4 ">
      <div className="flex flex-col items-center py-6">
        <span className="font-bold text-4xl"> / </span>
      </div>
      <div className="flex flex-col flex-1 w-full gap-1 overflow-scroll">
        <NavItem href="/" title="Overview" icon={<PaddingIcon />} />
        <NavItem href="/tasks" title="Tasks" icon={<ListBulletIcon />} />
        <NavItem href="/calendar" title="Calendar" icon={<CalendarIcon />} />
        <NavItem href="/projects" title="Projects" icon={<BackpackIcon />} />
        <NavItem
          href={`/budgets/${currentYear}`}
          title="Budgets"
          icon={<PieChartIcon />}
        />
        <NavItem href="/reports" title="Reports" icon={<FileIcon />} />
      </div>
      <div className="flex gap-2 items-center py-2">
        <NavItem
          href={"/profile"}
          icon={<PersonIcon />}
          title={user?.name ?? "N/A"}
        />
        <form action={signOut}>
          <Button variant={"ghost"} type="submit">
            <ExitIcon />
          </Button>
        </form>
        <ModeToggle />
      </div>
    </aside>
  )
}

const NavItem = ({
  href,
  title,
  icon,
}: {
  href: string
  title: string
  icon?: React.ReactNode
}) => {
  const pathname = usePathname()
  return (
    <Link
      href={href}
      className={cn(
        `transition ease-in-out`,
        `flex gap-2 items-center px-3 py-2 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-900 hover:font-medium w-full`,
        pathname === href
          ? "font-bold bg-zinc-100 dark:bg-zinc-900 rounded-lg px-2 py-1"
          : "hover:font-medium hover:bg-zinc-100 dark:hover:bg-zinc-900 rounded-lg px-2 py-1"
      )}
    >
      {icon && icon}
      <span>{title}</span>
    </Link>
  )
}
