"use server"

import { revalidatePath } from "next/cache"
import { getUserFromCookies } from "~/lib/auth"
import client from "~/lib/client"

export const uploadFile = async (prevState: any, formDate: FormData) => {
  "use server"
  try {
    const user = await getUserFromCookies()
    if (!user) return { success: false, message: "User not found" }
    const url = formDate.get("file") as string
    const name = formDate.get("name") as string
    const project = formDate.get("project") as string | undefined
    const payment = formDate.get("payment") as string | undefined
    await client.collection("documents").create({
      url,
      name,
      project,
      payment,
      owner: user.id,
    })
    revalidatePath(`/projects/${project}`)
    return { success: true, message: "File has been uploaded successfully!" }
  } catch (error: any) {
    console.error(error)
    return {
      success: false,
      message: "Failed to upload a file",
      details: error,
    }
  }
}
