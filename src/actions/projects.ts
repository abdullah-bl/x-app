"use server"

import { revalidatePath } from "next/cache"
import { getUserFromCookies } from "~/lib/auth"
import client from "~/lib/client"
import { Project, Status } from "~/types"
import { createChange } from "./changes"

export const createProject = async (prevState: any, formDate: FormData) => {
  try {
    const user = await getUserFromCookies()
    if (!user) return { success: false, message: "User not found" }
    const name = formDate.get("name") as string
    const cost = formDate.get("cost") as string
    const description = formDate.get("description") as string
    const duration = formDate.get("duration") as string
    const tags = formDate.get("tags") as string
    const type = formDate.get("type") as string
    const statusId = await client
      .collection("statuses")
      .getFirstListItem<Status>(`seq=1`)
    const project = await client.collection("projects").create({
      name,
      cost: parseInt(cost || "0"),
      description,
      tags,
      owner: user.id,
      statue: statusId?.id,
      duration: parseInt(duration || "0"),
      type,
      reference: "",
      number: "",
      submissionDate: "",
      lastOfferPresentationDate: "",
      offersOpeningDate: "",
      awardedDate: "",
      start: "",
      end: "",
    })
    revalidatePath("/projects")
    await createChange({
      target_id: project.id,
      action: "CREATE",
      note: "Project has been created",
      user: user.id,
    })
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
    // console.log({ project, status, note, timestamp })
    await client.collection("statuses_histories").create({
      project,
      status,
      note,
      timestamp,
      owner: user.id,
    })
    await client.collection("projects").update(project, { status })
    await createChange({
      action: "UPDATE",
      target_id: project,
      note,
      user: user.id,
    })
    revalidatePath("/projects")
    return { success: true, message: "Project status has been updated" }
  } catch (error) {
    console.error(error)
    return { success: false, message: "Failed to update project status" }
  }
}

export const updateProject = async (prevState: any, formDate: FormData) => {
  try {
    const user = await getUserFromCookies()
    if (!user) return { success: false, message: "User not found" }
    const data = Object.fromEntries(formDate.entries()) as Project
    const project = await client.collection("projects").getOne(data.id)
    await client.collection("projects").update(data.id, {
      ...project,
      ...data,
    })
    await createChange({
      action: "UPDATE",
      target_id: data.id,
      note: "Project details has been updated",
      user: user.id,
    })
    revalidatePath(`/projects/${data.id}`)
    return { success: true, message: "Project has been updated" }
  } catch (error) {
    console.error(error)
    return { success: false, message: "Failed to update project" }
  }
}

export const updateProjectTender = async (
  prevState: any,
  formDate: FormData
) => {
  try {
    const user = await getUserFromCookies()
    if (!user) return { success: false, message: "User not found" }
    const projectId = formDate.get("project") as string
    const number = formDate.get("number") as string
    const reference = formDate.get("reference") as string
    const submissionDate = formDate.get("submissionDate") as string
    const lastOfferPresentationDate = formDate.get(
      "lastOfferPresentationDate"
    ) as string
    const offersOpeningDate = formDate.get("offersOpeningDate") as string
    const awardedDate = formDate.get("awardedDate") as string
    const duration = formDate.get("duration") as string
    const type = formDate.get("type") as string

    console.log({
      projectId,
      number,
      reference,
      submissionDate,
      lastOfferPresentationDate,
      offersOpeningDate,
      awardedDate,
      duration,
      type,
    })
    await client.collection("projects").update(projectId, {
      number,
      reference,
      submissionDate,
      lastOfferPresentationDate,
      offersOpeningDate,
      awardedDate,
      duration,
      type,
    })
    await createChange({
      action: "UPDATE",
      target_id: projectId,
      note: "Tender details has been updated",
      user: user.id,
    })
    revalidatePath(`/projects/${projectId}`)
    return { success: true, message: "Project tender has been updated" }
  } catch (error) {
    console.error(error)
    return { success: false, message: "Failed to update project tender" }
  }
}

export const updateProjectContract = async (
  prevState: any,
  formDate: FormData
) => {
  try {
    const user = await getUserFromCookies()
    if (!user) return { success: false, message: "User not found" }
    const projectId = formDate.get("project") as string
    const start = formDate.get("start") as string
    const end = formDate.get("end") as string
    await client.collection("projects").update(projectId, {
      start,
      end,
    })
    await createChange({
      action: "UPDATE",
      target_id: projectId,
      note: "Contract details has been updated",
      user: user.id,
    })
    revalidatePath(`/projects/${projectId}`)
    return { success: true, message: "Project contract has been updated" }
  } catch (error) {
    console.error(error)
    return { success: false, message: "Failed to update project contract" }
  }
}
