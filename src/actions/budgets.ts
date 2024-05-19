"use server"

import client from "~/lib/client"
import { Budget } from "~/types"

export const getBudgets = async ({
  year = new Date().getFullYear(),
}: {
  year: number
}) => {
  try {
    const budgets = await client.collection("budgets").getFullList<Budget>({
      expand: "item",
      filter: `year = ${year}`,
    })
    return budgets
  } catch (error) {
    return []
  }
}
