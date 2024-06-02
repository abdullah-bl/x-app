"use server"

import { cookies } from "next/headers"
import client from "~/lib/client"
import { ZodError } from "zod"
import { signInSchema } from "~/lib/zod"
import { redirect } from "next/navigation"
import { User } from "~/types"

export const getUserFromCookies = async () => {
  console.info("getUserFromCookies")
  const session = cookies().get("pb_auth")
  if (!session) return null
  // load the session from the cookie
  client.authStore.loadFromCookie(`pb_auth=${session.value}`)
  // check if the session is valid
  if (!client.authStore.isValid) return null

  // await client.collection("users").authRefresh<User>()
  // return the user model
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
export const authenticate = async (
  prevState:
    | {
        success: boolean
        data: any
        message: string
      }
    | undefined,
  formData: FormData
) => {
  console.info("authenticate")
  const data = Object.fromEntries(formData)

  try {
    const { username, password } = await signInSchema.parseAsync({
      username: data.username,
      password: data.password,
    })
    const userData = await client
      .collection("users")
      .authWithPassword(username, password)
    // set the session cookie
    cookies().set("pb_auth", client.authStore.exportToCookie().split("=")[1])
    // set the session in the client
    return { success: true, data: userData, message: "Authenticated" }
  } catch (error) {
    console.error(error)
    if (error instanceof ZodError) {
      return {
        success: false,
        data: error.errors,
        message: "Failed to authenticate.",
      }
    }
    //     data: { code: 400, message: 'Failed to authenticate.', data: {} }
    return {
      success: false,
      data: error,
      message: "Failed to authenticate.",
    }
  }
}

// logout user
export const signOut = async () => {
  cookies().delete("pb_auth")
  client.authStore.clear()
  redirect("/login")
}
