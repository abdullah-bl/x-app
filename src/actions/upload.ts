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
    const target_id = formDate.get("target_id") as string
    await client.collection("files").create({
      url,
      name,
      target_id,
      owner: user.id,
    })
    revalidatePath(`/projects/${target_id.split("-")[0]}/files`)
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
