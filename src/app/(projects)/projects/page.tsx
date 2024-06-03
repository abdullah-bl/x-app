import { formatDistanceToNow } from "date-fns"
import Link from "next/link"
import { Suspense } from "react"
import ProjectsFilter from "~/components/forms/projects-filter"
import Hero from "~/components/layout/hero"
import { formatCurrency } from "~/lib/utils"
import { Separator } from "~/components/ui/separator"
import CustomCard from "~/components/custom/card"
import { getProjects } from "~/data/projects"
import StatusPreview from "~/components/custom/status"
import { Badge } from "~/components/ui/badge"
import BlurIn from "~/components/magicui/blur-in"
import WordFadeIn from "~/components/magicui/word-fade-in"
import { Button } from "~/components/ui/button"

export default async function ProjectsPage({
  searchParams,
}: {
  searchParams: {
    q?: string
    sort?: string
    status?: string
    cost_min?: string
    cost_max?: string
    start_date?: string
    end_date?: string
    min_created?: string
    max_created?: string
    type?: string
  }
}) {
  const projects = await getProjects({
    sort: searchParams.sort || "-updated",
    q: searchParams.q || "",
    status: searchParams.status || "",
    minCost: searchParams.cost_min || "",
    maxCost: searchParams.cost_max || "",
    start_date: searchParams.start_date || "",
    end_date: searchParams.end_date || "",
    min_created: searchParams.min_created || "",
    max_created: searchParams.max_created || "",
    tender_type: searchParams.type || "",
  })

  const total_cost = projects.reduce((acc, project) => {
    // skip if project status in draft
    if (project.status_seq === 1 || !project.status) return acc
    return acc + project.cost
  }, 0)

  return (
    <div className="grid gap-6 max-w-5xl mx-auto">
      <Hero>
        <div className="grid gap-1 place-items-center">
          <h3 className="text-4xl font-medium">Projects Overview</h3>
          <p className="text-zinc-500">
            Preview, filter, and manage your projects.
          </p>
        </div>
      </Hero>

      <div className="grid gap-2 grid-cols-2 sm:grid-cols-4 auto-cols-max grid-flow-row">
        <CustomCard title="Projects" value={projects.length} />
        <CustomCard title="Cost" value={formatCurrency(total_cost, "SAR")} />
        <CustomCard title="Paid" value={formatCurrency(0, "SAR")} />
        <CustomCard title="Unpaid" value={formatCurrency(0, "SAR")} />
      </div>
      <div className="flex gap-4 flex-col sm:flex-row flex-wrap ">
        <div className="flex-1 flex flex-col gap-1">
          {projects?.map((project) => (
            <div
              key={project.id}
              dir="auto"
              className="border rounded-md p-2 grid gap-1 hover:shadow-sm"
            >
              <div className="flex items-center justify-between">
                <div className="font-mono text-sm rounded-md px-2 flex items-center gap-1">
                  <span className="h-3 w-3 rounded-full bg-yellow-500" />
                  <span className="font-medium">
                    {project.status ? project.expand?.status.name : "Draft"}
                  </span>
                </div>
                <Link
                  className="hover:underline"
                  href={`/projects/${project.id}`}
                >
                  {project.name}
                </Link>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">
                  {formatCurrency(project.cost, "SAR")}
                </span>
                <span className="text-sm">{project.tender?.type ?? "N/A"}</span>
              </div>
              <span className="text-sm text-zinc-500">{project.tags}</span>
              <div className="flex items-center justify-between">
                <Link
                  href={`/users/${project.owner}`}
                  className="text-sm hover:underline"
                >
                  {project.expand?.owner.name}
                </Link>
                <span className="text-sm" title={project.updated}>
                  {formatDistanceToNow(project.updated)}
                </span>
              </div>
            </div>
          ))}
          {/* No Projects */}
          {projects.length === 0 && (
            <div className="p-4 gap-2 items-center place-items-center min-h-full grid place-content-center">
              <p className="text-lg text-center">
                No projects found. Try creating a new project.
              </p>
              <Link href="/projects/new" className="btn btn-primary">
                Create a new project
              </Link>
              <pre>{JSON.stringify(searchParams, null, 2)}</pre>
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
          <Button size={"sm"} variant={"outline"} disabled>
            Generate Report (PDF)
          </Button>
          <Separator className="my-4" />
          <h3 className="text-lg font-medium">Filters</h3>
          <ProjectsFilter />
        </div>
      </div>
    </div>
  )
}
