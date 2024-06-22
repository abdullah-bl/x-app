"use client"

import Image from "next/image"
import { Back } from "../custom/back"
import { Button } from "../ui/button"
import { MenuButton } from "../custom/menu"

export const PageHeader = ({
  children,
  title,
  showBackButton = false,
}: {
  title?: string
  children?: React.ReactNode
  showBackButton?: boolean
}) => {
  return (
    <header className="flex items-center p-2 py-2 px-4 gap-2 rounded-lg border shadow-sm bg-background/70 text-foreground sticky top-0 z-50">
      <MenuButton />
      {showBackButton && <Back />}
      {title && <h3 className="text-lg font-medium">{title}</h3>}
      {children}
    </header>
  )
}
