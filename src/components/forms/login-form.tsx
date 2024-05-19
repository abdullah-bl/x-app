"use client"

import {
  ArrowRightIcon,
  ExclamationTriangleIcon,
  KeyboardIcon,
  LockClosedIcon,
  PersonIcon,
  SymbolIcon,
} from "@radix-ui/react-icons"
import { Button } from "../ui/button"
import { useFormState, useFormStatus } from "react-dom"
import { authenticate } from "~/lib/auth"
import { useEffect } from "react"
import { redirect } from "next/navigation"
import { toast } from "sonner"

export default function LoginForm() {
  const [state, dispatch] = useFormState(authenticate, undefined)

  useEffect(() => {
    console.log("state", state)
    if (state?.success) {
      toast.success("Authentication successful")
      redirect("/")
    } else if (!state?.success) {
      toast.error("Authentication failed", {
        description: "Please check your username and password and try again.",
      })
      console.error(state)
    }
  }, [state])

  return (
    <form action={dispatch} className="space-y-3 sm:min-w-[400px] min-w-full">
      <div className="flex-1 rounded-lg border bg-gray-50 dark:bg-zinc-900 px-6 pb-4 pt-8">
        <h1 className={`mb-1 text-2xl`}>Log in</h1>
        <p className="text-base ">Sign in to your account.</p>
        <div className="w-full">
          <div>
            <label
              className="mb-2 mt-5 block text-xs font-medium"
              htmlFor="username"
            >
              Username
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                id="username"
                type="username"
                name="username"
                placeholder="Enter your username address"
                required
              />
              <PersonIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2  peer-focus:text-gray-900" />
            </div>
          </div>
          <div className="mt-4">
            <label
              className="mb-2 mt-5 block text-xs font-medium"
              htmlFor="password"
            >
              Password
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                id="password"
                type="password"
                name="password"
                placeholder="Enter password"
                required
                minLength={6}
              />
              <LockClosedIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>
        <LoginButton />
      </div>
    </form>
  )
}

function LoginButton() {
  const { pending } = useFormStatus()

  return (
    <Button variant={"default"} className="mt-4 w-full" aria-disabled={pending}>
      Log in{" "}
      <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50 dark:text-zinc-800" />
    </Button>
  )
}
