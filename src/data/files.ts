"use server"

import client from "~/lib/client"
import { XFile } from "~/types"

export const getFiles = async (projectId: string) => {
  try {
    return await client.collection("files").getFullList<XFile>({
      filter: `target_id = "${projectId}"`,
      sort: "-created",
      expand: "owner",
    })
  } catch (error) {
    console.error(error)
    return []
  }
}
