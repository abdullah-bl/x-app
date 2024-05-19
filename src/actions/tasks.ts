"use server"

import { revalidatePath } from "next/cache"
import { getUserFromCookies } from "~/lib/auth"
import client from "~/lib/client"
import { taskSchema } from "~/lib/zod"

export const createTask = async (
  prevState:
    | {
        success: boolean
        message: string
      }
    | undefined,
  formDate: FormData
) => {
  const user = await getUserFromCookies()
  if (!user) {
    throw new Error("You must be signed in to perform this action")
  }
  try {
    const date = taskSchema.parse(Object.fromEntries(formDate.entries()))
    await client.collection("tasks").create({
      ...date,
      owner: user.id,
    })
    revalidatePath("/tasks")
    return { success: true, message: "Task Created" }
  } catch (error) {
    console.error(error)
    return { success: false, message: "Failed to create task" }
  }
}
