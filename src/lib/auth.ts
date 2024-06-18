"use server"

import { cookies } from "next/headers"
import client from "~/lib/client"
import { ZodError } from "zod"
import { signInSchema } from "~/lib/zod"
import { redirect } from "next/navigation"
import { User } from "~/types"

export const isAuthenticated = async () => {
  const session = cookies().get("pb_auth")
  if (!session) return false
  client.authStore.loadFromCookie(`pb_auth=${session.value}`)
  if (!client.authStore.isValid) {
    cookies().delete("pb_auth")
    client.authStore.clear()
    return false
  } else {
    return client.authStore.model
  }
}

export const getUserFromCookies = async () => {
  console.info("getUserFromCookies")
  const session = cookies().get("pb_auth")
  if (!session) return null
  // load the session from the cookie
  client.authStore.loadFromCookie(`pb_auth=${session.value}`)
  // check if the session is valid
  if (!client.authStore.isValid) {
    cookies().delete("pb_auth")
    client.authStore.clear()
    return null
  }
  return client.authStore.model as User
}

export const getUserDate = async () => {
  try {
    const user = getUserFromCookies()
    if (!user) return null
    return (await client.collection("users").authRefresh<User>()).record
  } catch (error) {
    console.error(error)
    return null
  }
}

// login user

// logout user
export const signOut = async () => {
  cookies().delete("pb_auth")
  client.authStore.clear()
  redirect("/login")
}
