"use server"

import { revalidatePath } from "next/cache"
import { getUserFromCookies } from "~/lib/auth"
import client from "~/lib/client"
import { Budget } from "~/types"
import { navigate } from "."

export type InitState = {
  success?: boolean | undefined
  message?: string | undefined
  data?: any | undefined
}

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

export const createBudget = async (
  initState: InitState,
  formData: FormData
) => {
  try {
    await getUserFromCookies()
    const data = Object.fromEntries(formData.entries())
    await client.collection("budgets").create({
      ...data,
    })
    revalidatePath(`/items/${data.item}`)
    return { success: true, message: "Budget created successfully" }
  } catch (error) {
    console.error(error)
    return { success: false, message: "Failed to create budget", data: error }
  }
}

export const updateBudget = async (
  initState: InitState,
  formData: FormData
) => {
  try {
    await getUserFromCookies()
    const data = Object.fromEntries(formData.entries())
    await client.collection("budgets").update(data.id as string, data)
    revalidatePath(`/items/${data.item}`)
    return { success: true, message: "Budget updated successfully" }
  } catch (error) {
    console.error(error)
    return { success: false, message: "Failed to update budget", data: error }
  }
}
