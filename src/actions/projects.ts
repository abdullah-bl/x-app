"use server"

import { revalidatePath } from "next/cache"
import { getUserFromCookies } from "~/lib/auth"
import client from "~/lib/client"

export const createProject = async (prevState: any, formDate: FormData) => {
  "use server"
  try {
    const user = await getUserFromCookies()
    if (!user) return { success: false, message: "User not found" }
    const name = formDate.get("name") as string
    const cost = formDate.get("cost") as string
    const description = formDate.get("description") as string
    const tags = formDate.get("tags") as string
    await client.collection("projects").create({
      name,
      cost: parseInt(cost || "0"),
      description,
      tags,
      owner: user.id,
    })
    revalidatePath("/projects")
    return { success: true, message: "Project has been created successfully" }
  } catch (error) {
    console.error(error)
    return { success: false, message: "Failed to create project" }
  }
}

export const updateProjectStatus = async (
  prevState: any,
  formDate: FormData
) => {
  try {
    const user = await getUserFromCookies()
    if (!user) return { success: false, message: "User not found" }
    const project = formDate.get("project") as string
    const status = formDate.get("status") as string
    const note = formDate.get("note") as string
    const timestamp = formDate.get("timestamp") as string
    console.log({ project, status, note, timestamp })
    await client.collection("statuses_histories").create({
      project,
      status,
      note,
      timestamp,
      owner: user.id,
    })
    await client.collection("projects").update(project, { status })
    revalidatePath("/projects")
    return { success: true, message: "Project status has been updated" }
  } catch (error) {
    console.error(error)
    return { success: false, message: "Failed to update project status" }
  }
}
