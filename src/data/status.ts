"use server"

import client from "~/lib/client"
import { Status } from "~/types"

export const getStatusBySeq = async (seq: number) => {
  try {
    return await client
      .collection("statuses")
      .getFirstListItem<Status>(`seq = ${seq}`)
  } catch (error) {
    console.error(error)
    return { name: "Unknown" }
  }
}
