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
import UpdateProjectStatus from "~/components/forms/update-status"
import Container from "~/components/layout/container"
import { PageHeader } from "~/components/layout/header"

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
    <Container>
      <PageHeader showBackButton title={project.name} />
      <div className="flex-1 flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <UpdateProjectStatus
            projectId={params.id}
            currentStatus={project.expand?.status}
          />
          <span className="text-sm">
            {formatRelative(new Date(project.updated), new Date())}
          </span>
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
          <CustomLink href={`/projects/${project.id}/settings`}>
            Settings
          </CustomLink>
        </div>
        <div className="flex-1 py-2">{children}</div>
      </div>
    </Container>
  )
}
