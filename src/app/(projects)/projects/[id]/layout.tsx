import { formatRelative } from "date-fns"

import { getProjectById } from "~/data/projects"
import CustomLink from "~/components/custom/link"
import UpdateProjectStatus from "./components/update-status"
import Container from "~/components/layout/container"
import { PageHeader } from "~/components/layout/header"
import { getUserFromCookies, isAllowed } from "~/lib/auth"
import Link from "next/link"

export default async function Layout({
  children,
  params,
}: {
  children?: React.ReactNode
  params: { id: string }
}) {
  const allowed = await isAllowed(["pm"])
  const user = await getUserFromCookies()
  const project = await getProjectById(params.id)

  return (
    <Container>
      <PageHeader showBackButton title={project.name}>
        <div className="flex items-center justify-end flex-1">
          {user?.id === project.owner ? (
            <Link
              href={`/projects/${params.id}/edit`}
              className="p-2 px-4 rounded-lg hover:bg-zinc-100 dark:bg-zinc-900 hover:font-medium text-sm"
            >
              تعديل
            </Link>
          ) : (
            <span />
          )}
        </div>
      </PageHeader>
      <div className="flex-1 flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <UpdateProjectStatus
            disabled={project.archived || !allowed}
            projectId={params.id}
            currentStatus={project.expand?.status}
          />
          <span className="text-sm">
            {formatRelative(new Date(project.updated), new Date())}
          </span>
        </div>
        <div className="flex items-center justify-center gap-2 overflow-scroll">
          <CustomLink href={`/projects/${project.id}/`}>ملخص عام</CustomLink>
          <CustomLink href={`/projects/${project.id}/timeline`}>
            تسلسل زمني
          </CustomLink>
          {/* <CustomLink href={`/projects/${project.id}/tasks`}>Tasks</CustomLink> */}
          <CustomLink href={`/projects/${project.id}/budgets`}>
            الميزانية و المدفوعات
          </CustomLink>
          <CustomLink href={`/projects/${project.id}/files`}>
            الملفات
          </CustomLink>
          <CustomLink href={`/projects/${project.id}/members`}>
            الأعضاء
          </CustomLink>
          <CustomLink href={`/projects/${project.id}/changes`}>
            التغييرات
          </CustomLink>
        </div>
        <div className="flex-1 py-2">{children}</div>
      </div>
    </Container>
  )
}
