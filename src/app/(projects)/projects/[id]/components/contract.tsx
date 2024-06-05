import UpdateProjectContract from "~/components/forms/update-contract"
import { formatDate } from "~/lib/utils"
import { Project } from "~/types"

export default async function ContractDetails({
  project,
}: {
  project: Project
}) {
  return (
    <div className="grid gap-2 w-full">
      <div className="flex items-center justify-between">
        <h3 className="font-medium">Contract Details</h3>
        <UpdateProjectContract project={project} />
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 border rounded-md text-sm">
        <div className="flex flex-col gap-2 bg-zinc-100 dark:bg-zinc-900 p-2 w-full">
          <span className="font-medium">Start Date</span>
        </div>
        <div className="flex flex-col gap-2 p-2 w-full">
          <span>{formatDate(project?.start)}</span>
        </div>
        <div className="flex flex-col gap-2 bg-zinc-100 dark:bg-zinc-900 p-2 w-full">
          <span className="font-medium">End Date</span>
        </div>
        <div className="flex flex-col gap-2 p-2 w-full">
          <span>{formatDate(project?.end)}</span>
        </div>
      </div>
    </div>
  )
}
