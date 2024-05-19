import { Separator } from "~/components/ui/separator"
import { formatRelative } from "date-fns"
import { redirect } from "next/navigation"
import { Back } from "~/components/custom/back"
import CustomCard from "~/components/custom/card"
import { UploadFile } from "~/components/forms/upload-file"
import Hero from "~/components/layout/hero"
import client from "~/lib/client"
import { formatCurrency } from "~/lib/utils"
import { Project } from "~/types"
import UpdateProjectStatus from "~/components/forms/update-project-status"

const getProjectById = async (id: string) => {
  try {
    return await client.collection("projects").getOne<Project>(id, {
      expand: "budgets,budgets.item,owner,status",
    })
  } catch (error) {
    console.error(error)
    redirect("/projects")
  }
}

export default async function ProjectDetailsPage({
  params,
}: {
  params: { id: string }
}) {
  const project = await getProjectById(params.id)

  return (
    <div className="grid gap-4">
      <div className=" aspect-[5/1] p-2 flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <Back />
          <span className="text-sm">
            {formatRelative(new Date(project.updated), new Date())}
          </span>
        </div>
        <h3 className="text-2xl font-medium">{project.name}</h3>
      </div>
      <div className="grid gap-2 grid-cols-1 sm:grid-cols-3 auto-cols-max grid-flow-row">
        <CustomCard title="Cost" value={formatCurrency(project.cost, "SAR")} />
        <CustomCard title="Paid" value={formatCurrency(0, "SAR")} />
        <CustomCard title="Left" value={formatCurrency(0, "SAR")} />
      </div>
      <div className="flex gap-4 w-full flex-1 my-1 flex-wrap">
        <div className="flex-1 flex flex-col gap-2">
          <h3 className="text-base font-medium">Details</h3>
          <pre className=" whitespace-pre-wrap ">
            {JSON.stringify(project, null, 2)}
          </pre>
        </div>
        <div className="w-full sm:w-1/3 flex flex-col gap-2">
          <UpdateProjectStatus
            projectId={project.id}
            currentStatusId={project.status}
          />
          <Separator className="my-4" />
          <UploadFile targetId={project.id} targetName={"project"} />
        </div>
      </div>
    </div>
  )
}
