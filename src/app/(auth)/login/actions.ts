"use server"

import { cookies } from "next/headers"
import { ZodError } from "zod"
import client from "~/lib/client"
import { signInSchema } from "~/lib/zod"

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
