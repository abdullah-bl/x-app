import { formatDistanceToNow } from "date-fns"
import Link from "next/link"
import { Suspense } from "react"
import ProjectsFilter from "~/components/forms/projects-filter"
import Hero from "~/components/layout/hero"
import { Input } from "~/components/ui/input"
import { getUserFromCookies } from "~/lib/auth"
import client from "~/lib/client"
import { formatCurrency } from "~/lib/utils"
import { Separator } from "~/components/ui/separator"
import CustomCard from "~/components/custom/card"
import { Project } from "~/types"

const getProjects = async ({
  sort = "-updated",
  q = "",
  status = "",
}: {
  sort?: string
  q?: string
  status?: string
}) => {
  try {
    await getUserFromCookies()
    return await client.collection("projects").getFullList<Project>({
      filter: q ? `name ~ "${q.trim()}" || cost >= ${q.trim()}` : "",
      sort: sort,
      expand: "status,owner",
    })
  } catch (error) {
    console.error(error)
    return []
  }
}

export default async function ProjectsPage({
  searchParams,
}: {
  searchParams: {
    q?: string
    sort?: string
  }
}) {
  const projects = await getProjects({
    sort: searchParams.sort || "-updated",
    q: searchParams.q || "",
  })

  const total_cost = projects.reduce((acc, project) => {
    return acc + project.cost
  }, 0)

  console.log(projects)

  return (
    <div className="grid gap-6">
      <Hero>
        <div className="flex items-center justify-center space-x-4">
          <h3 className="text-2xl font-medium">Our Projects</h3>
        </div>
      </Hero>

      <div className="grid gap-2 grid-cols-2 sm:grid-cols-4 auto-cols-max grid-flow-row">
        <CustomCard title="Projects" value={projects.length} />
        <CustomCard title="Cost" value={formatCurrency(total_cost, "SAR")} />
        <CustomCard title="Paid" value={formatCurrency(0, "SAR")} />
        <CustomCard title="Unpaid" value={formatCurrency(0, "SAR")} />
      </div>

      <div className="flex gap-4 flex-col sm:flex-row flex-wrap ">
        <div className="flex-1 flex flex-col gap-2">
          {projects?.map((project) => (
            <div
              key={project.id}
              dir="auto"
              className="border rounded-md p-2 grid gap-1"
            >
              <div className="flex items-center justify-between">
                <Link
                  className="font-medium hover:underline"
                  href={`/projects/${project.id}`}
                >
                  {project.name}
                </Link>
                <span className="text-sm">
                  {formatCurrency(project.cost, "SAR")}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-zinc-500">
                  {project.expand?.status?.name ?? "No Status"}
                </span>
                <span className="text-sm text-zinc-500">
                  {project.short_number + " "}
                </span>
                <span className="text-sm text-zinc-500">
                  {project.reference ?? "No Reference"}
                </span>
              </div>
              {/* <p className="text-sm text-zinc-500 whitespace-pre-wrap">
                {project.description?.slice(0, 150) || "No Description"}
              </p> */}
              <span className="text-sm text-zinc-500">{project.tags}</span>
              <div className="flex items-center justify-between">
                <Link
                  href={`/users/${project.owner}`}
                  className="text-sm hover:underline"
                >
                  {project.expand?.owner.name}
                </Link>
                <span className="text-sm">
                  {formatDistanceToNow(project.updated)}
                </span>
              </div>
            </div>
          ))}
          {projects.length === 0 && (
            <div className="p-4 text-center text-lg font-medium">
              No projects found
            </div>
          )}
        </div>
        <div className="sm:w-1/3 flex flex-col gap-2">
          <Link
            href="/projects/new"
            className="inline-flex items-center justify-center whitespace-nowrap font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-8 rounded-md px-3 text-xs"
          >
            + Create a new project
          </Link>
          <Separator className="my-4" />
          <Suspense fallback={<div>Loading...</div>}>
            <ProjectsFilter />
          </Suspense>
        </div>
      </div>
    </div>
  )
}
