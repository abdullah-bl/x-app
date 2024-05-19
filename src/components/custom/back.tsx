"use client"

import { useRouter } from "next/navigation"
import { Button } from "../ui/button"
import { ArrowLeftIcon } from "@radix-ui/react-icons"

export function Back() {
  const router = useRouter()
  return (
    <Button variant={"ghost"} onClick={() => router.back()}>
      <ArrowLeftIcon />
    </Button>
  )
}
