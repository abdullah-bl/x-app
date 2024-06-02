"use server"

import client from "~/lib/client"
import { Change } from "~/types"

export const createChange = async ({
  target_id,
  action,
  user,
  note,
}: Change) => {
  await client.collection("changes").create({
    target_id: target_id,
    action: action,
    user: user,
    note: note,
  })
}

export const getChanges = async ({
  page = 1,
  perPage = 30,
  target_id,
}: {
  page: number
  perPage: number
  target_id: string
}) => {
  try {
    return await client.collection("changes").getList<Change>(page, perPage, {
      filter: ` target_id = "${target_id}"`,
      sort: "-created",
      expand: "user",
    })
  } catch (error) {
    console.error(error)
    return { page: 1, perPage: 30, total_items: 0, items: [] }
  }
}
