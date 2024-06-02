import { formatRelative } from "date-fns"

import { getProjectById } from "~/data/projects"
import { Back } from "~/components/custom/back"
import CustomCard from "~/components/custom/card"
import CustomLink from "~/components/custom/link"
import { formatCurrency } from "~/lib/utils"
import { getFiles } from "~/data/files"
import StatusPreview from "~/components/custom/status"
import { Badge } from "~/components/ui/badge"
import Link from "next/link"
import { Pencil1Icon } from "@radix-ui/react-icons"
import { Button } from "~/components/ui/button"
import UpdateProjectStatus from "~/components/forms/update-project-status"

export default async function Layout({
  children,
  params,
}: {
  children?: React.ReactNode
  params: { id: string }
}) {
  const project = await getProjectById(params.id)
  const filesCount = (await getFiles(`project-${params.id}`)).length

  return (
    <div className="flex flex-col gap-6 flex-wrap w-full flex-1 min-w-full">
      <div className="flex-1 flex flex-col gap-4">
        <div className=" py-4 flex flex-col gap-4 justify-between">
          <div className="flex items-start gap-6" dir="auto">
            <Button className="px-4 gap-2">
              <Pencil1Icon /> Edit
            </Button>
            <div className="grid gap-1">
              <h3 className="text-2xl font-medium" dir="auto">
                {project.name}
              </h3>
              <p className=" whitespace-pre-wrap text-sm" dir="auto">
                {project.description}
              </p>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <UpdateProjectStatus
              projectId={params.id}
              currentStatus={project.expand?.status}
            />
            <span className="text-sm">
              {formatRelative(new Date(project.updated), new Date())}
            </span>
          </div>
        </div>
        <div className="flex items-center justify-center gap-2 overflow-scroll">
          <CustomLink href={`/projects/${project.id}/`}>Overview</CustomLink>
          <CustomLink href={`/projects/${project.id}/timeline`}>
            Timeline
          </CustomLink>
          <CustomLink href={`/projects/${project.id}/tasks`}>
            Tasks (0)
          </CustomLink>
          <CustomLink href={`/projects/${project.id}/budgets`}>
            Budgets
          </CustomLink>
          <CustomLink href={`/projects/${project.id}/files`}>
            Files ({filesCount})
          </CustomLink>
          <CustomLink href={`/projects/${project.id}/changes`}>
            Changes
          </CustomLink>
        </div>
        <div className="flex-1 py-2">{children}</div>
      </div>
    </div>
  )
}
