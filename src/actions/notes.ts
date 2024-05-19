"use server"

import { revalidatePath } from "next/cache"
import { getUserFromCookies } from "~/lib/auth"
import client from "~/lib/client"

export const createNote = async (prevState: any, formDate: FormData) => {
  "use server"
  try {
    const user = await getUserFromCookies()
    if (!user) return { success: false, message: "User not found" }
    const content = formDate.get("content") as string
    const color = formDate.get("color") as string
    await client.collection("notes").create({
      content,
      color,
      owner: user.id,
    })
    revalidatePath("/")
    return { success: "Note created", message: "Note created" }
  } catch (error) {
    console.error(error)
    return { success: false, message: "Failed to create note" }
  }
}
