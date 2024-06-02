"use server"

import { redirect } from "next/navigation"
import client from "~/lib/client"
import { formatDateToSQL } from "~/lib/utils"
import { Project, ProjectBudget, Status, StatusHistory, XFile } from "~/types"

export const getProjects = async ({
  sort = "-updated",
  q = "",
  status = "",
  minCost = "",
  maxCost = "",
  start_date = "",
  end_date = "",
  min_created = "",
  max_created = "",
}: {
  sort?: string
  q?: string
  status?: string
  minCost?: string
  maxCost?: string
  start_date?: string
  end_date?: string
  min_created?: string
  max_created?: string
}) => {
  const filter = []
  if (q.trim().length > 0)
    filter.push(
      `(name~"${q}" || description~"${q}" || reference~"${q}" || short_number~"${q}" || tags~"${q}")`
    )
  if (status.trim().length > 0) filter.push(`status="${status}"`)
  if (minCost.trim().length > 0) filter.push(`cost>=${minCost}`)
  if (maxCost.trim().length > 0) filter.push(`cost<=${maxCost}`)
  if (start_date.trim().length > 0)
    filter.push(`start_date>="${formatDateToSQL(new Date(start_date))}"`)
  if (end_date.trim().length > 0)
    filter.push(`end_date<="${formatDateToSQL(new Date(end_date))}"`)
  if (min_created.trim().length > 0)
    filter.push(`created>="${formatDateToSQL(new Date(min_created))}"`)
  if (max_created.trim().length > 0)
    filter.push(`created<="${formatDateToSQL(new Date(max_created))}"`)

  try {
    return await client.collection("projects").getFullList<Project>({
      filter: filter.join(" && "),
      sort: sort,
      expand: "owner,status",
    })
  } catch (error) {
    console.error(error)
    return []
  }
}

export const getProjectById = async (id: string) => {
  try {
    return await client.collection("projects").getOne<Project>(id, {
      expand: "budgets,budgets.item,owner,status",
    })
  } catch (error) {
    console.error(error)
    redirect("/projects")
  }
}

export const getProjectStatusHistory = async (projectId: string) => {
  try {
    return await client
      .collection("statuses_histories")
      .getFullList<StatusHistory>({
        filter: `project = "${projectId}"`,
        sort: "-created",
        expand: "status,owner",
      })
  } catch (error) {
    console.error(error)
    return []
  }
}

export const getProjectBudgets = async (projectId: string) => {
  try {
    return await client
      .collection("projects_budgets")
      .getFullList<ProjectBudget>({
        filter: `project = "${projectId}"`,
        expand: "budget, owner, budget.item",
      })
  } catch (error) {
    console.error(error)
    return []
  }
}
