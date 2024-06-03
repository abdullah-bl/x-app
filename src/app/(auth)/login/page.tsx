"use client"

import {
  ArrowRightIcon,
  LockClosedIcon,
  PersonIcon,
} from "@radix-ui/react-icons"

import { Button } from "~/components/ui/button"
import { useFormState, useFormStatus } from "react-dom"
import { authenticate } from "~/lib/auth"
import { useEffect } from "react"
import { redirect } from "next/navigation"
import { toast } from "sonner"
import { ModeToggle } from "~/components/layout/theme"
import { Input } from "~/components/ui/input"

export default function LoginPage() {
  const [state, dispatch] = useFormState(authenticate, undefined)

  useEffect(() => {
    console.log("state", state)
    if (state?.success === true) {
      toast.success("Authentication successful")
      redirect("/")
    } else if (state?.success === false) {
      toast.error("Authentication failed", {
        description: "Please check your username and password and try again.",
      })
      console.error(state)
    }
  }, [state])

  return (
    <div className="grid place-items-center h-screen">
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
                <Input
                  className="peer block w-full rounded-md border border-gray-200 text-sm outline-2 placeholder:text-gray-500"
                  id="username"
                  type="username"
                  name="username"
                  placeholder="Enter your username address"
                  required
                />
                {/* <PersonIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2  peer-focus:text-gray-900" /> */}
              </div>
            </div>
            <div className="mt-4">
              <label
                className="mb-2 block text-xs font-medium"
                htmlFor="password"
              >
                Password
              </label>
              <div className="relative">
                <Input
                  className="peer block w-full rounded-md border border-gray-200 text-sm outline-2 placeholder:text-gray-500"
                  id="password"
                  type="password"
                  name="password"
                  placeholder="Enter password"
                  required
                  minLength={6}
                />
                {/* <LockClosedIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" /> */}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2 mt-4">
            <LoginButton />
            <ModeToggle />
          </div>
        </div>
      </form>
    </div>
  )
}

function LoginButton() {
  const { pending } = useFormStatus()

  return (
    <Button variant={"default"} className="w-full" aria-disabled={pending}>
      Log in{" "}
      <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50 dark:text-zinc-800" />
    </Button>
  )
}
