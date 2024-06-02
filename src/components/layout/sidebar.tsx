"use client"

import { ModeToggle } from "./theme"
import {
  ArrowLeftIcon,
  ArrowUpIcon,
  ChatBubbleIcon,
  DotsVerticalIcon,
  ExitIcon,
  GearIcon,
  LetterCaseCapitalizeIcon,
  PersonIcon,
  PlusIcon,
} from "@radix-ui/react-icons"
import { signOut } from "~/lib/auth"
import { Button } from "~/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu"
import Link from "next/link"
import { usePathname } from "next/navigation"

export default function SideBar() {
  const currentYear = new Date().getFullYear()

  return (
    <aside className="w-2/3">
      <div className="flex items-center space-x-4 flex-1">
        <NavItem href="/">/</NavItem>
        <NavItem href="/projects">Projects</NavItem>
        <NavItem href={`/budgets/${currentYear}`}>Budgets</NavItem>
        <NavItem href="/reports">Reports</NavItem>
      </div>
      <div className="flex items-center space-x-4">
        <ModeToggle />
        <UserMenu />
      </div>
    </aside>
  )
}

const NavItem = ({
  href,
  children,
}: {
  href: string
  children: React.ReactNode
}) => {
  const pathname = usePathname()
  return (
    <Link
      href={href}
      className={
        pathname === href ? "font-bold  underline" : "hover:font-medium"
      }
    >
      {children}
    </Link>
  )
}

const UserMenu = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size={"icon"}>
          <PersonIcon />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <PersonIcon className="mr-2 h-4 w-4" />
            <span>Profile</span>
            <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <GearIcon className="mr-2 h-4 w-4" />
            <span>Settings</span>
            <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup aria-disabled>
          <DropdownMenuItem disabled>
            <PersonIcon className="mr-2 h-4 w-4" />
            <span>Team</span>
          </DropdownMenuItem>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger disabled>
              <PlusIcon className="mr-2 h-4 w-4" />
              <span>Invite users</span>
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <DropdownMenuItem disabled>
                  <LetterCaseCapitalizeIcon className="mr-2 h-4 w-4" />
                  <span>Email</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <ChatBubbleIcon className="mr-2 h-4 w-4" />
                  <span>Message</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <form action={signOut}>
            <button type="submit" className="flex items-center w-full">
              <ExitIcon className="mr-2 h-4 w-4" />
              <span>Logout</span>
              <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
            </button>
          </form>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
