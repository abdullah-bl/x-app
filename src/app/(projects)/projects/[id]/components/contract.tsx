import { FileIcon } from "@radix-ui/react-icons"
import Link from "next/link"
import UpdateProjectContract from "~/components/forms/update-contract"
import { Button } from "~/components/ui/button"
import client from "~/lib/client"
import { formatDate } from "~/lib/utils"
import { Project, type Contract } from "~/types"

const getProjectContract = async (projectId: string) => {
  try {
    return await client
      .collection("contracts")
      .getFirstListItem<Contract>(`project = "${projectId}"`)
  } catch (error) {
    console.error(error)
    return undefined
  }
}

export default async function ContractDetails({
  project,
}: {
  project: Project
}) {
  return (
    <div className="grid gap-2 w-full">
      <div className="flex items-center justify-between">
        <h3 className="text-lg">Contract Details</h3>
        <UpdateProjectContract project={project} />
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 border rounded-md text-sm">
        <div className="flex flex-col gap-2 bg-zinc-100 dark:bg-zinc-900 p-2 w-full">
          <span className="font-medium">Start Date</span>
        </div>
        <div className="flex flex-col gap-2 p-2 w-full">
          <span>{formatDate(project?.contract?.start)}</span>
        </div>
        <div className="flex flex-col gap-2 bg-zinc-100 dark:bg-zinc-900 p-2 w-full">
          <span className="font-medium">End Date</span>
        </div>
        <div className="flex flex-col gap-2 p-2 w-full">
          <span>{formatDate(project?.contract?.end)}</span>
        </div>
      </div>
    </div>
  )
}
