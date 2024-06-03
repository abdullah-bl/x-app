import CustomCard from "~/components/custom/card"
import { getProjectById } from "~/data/projects"
import { formatCurrency } from "~/lib/utils"
import TenderDetails from "./components/tender"
import ContractDetails from "./components/contract"
import { Suspense } from "react"

export const dynamic = "force-dynamic"

export default async function ProjectDetailsPage({
  params,
}: {
  params: { id: string }
}) {
  const project = await getProjectById(params.id)

  return (
    <div className="grid gap-4">
      <div className="grid gap-2 grid-cols-1 sm:grid-cols-3 auto-cols-max grid-flow-row">
        <CustomCard title="Cost" value={formatCurrency(project.cost, "SAR")} />
        <CustomCard title="Paid" value={formatCurrency(0, "SAR")} />
        <CustomCard title="Left" value={formatCurrency(0, "SAR")} />
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2 border rounded-lg">
          <div className="flex flex-col gap-2 bg-zinc-100 dark:bg-zinc-900 p-2 w-full">
            <span className="font-medium">Description</span>
          </div>
          <div className="flex flex-col gap-2 p-2 w-full flex-1" dir="auto">
            <p className=" whitespace-pre-wrap ">
              {project.description || "Not Set"}
            </p>
          </div>
        </div>
        <Suspense fallback={<div>Loading...</div>}>
          <TenderDetails project={project} />
        </Suspense>
        <Suspense fallback={<div>Loading...</div>}>
          <ContractDetails project={project} />
        </Suspense>
      </div>
    </div>
  )
}
