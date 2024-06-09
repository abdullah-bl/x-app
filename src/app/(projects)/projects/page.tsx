import Link from "next/link"
import ProjectsFilter from "~/components/forms/projects-filter"
import Hero from "~/components/layout/hero"
import { formatCurrency } from "~/lib/utils"
import MetricCard from "~/components/custom/metricCard"
import { getProjects } from "~/data/projects"
import { PageHeader } from "~/components/layout/header"
import Container from "~/components/layout/container"
import ProjectsTable from "./components/table"
import {
  BackpackIcon,
  CheckIcon,
  InfoCircledIcon,
  RocketIcon,
} from "@radix-ui/react-icons"

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
    archived?: string
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
    archived: "false",
  })

  const total_cost = projects.reduce((acc, project) => {
    // skip if project status in draft
    if (!project.expand?.status?.active || !project.status) return acc
    return acc + project.cost
  }, 0)

  return (
    <Container>
      <PageHeader title="Project Page">
        <div className="flex-1 flex items-center justify-end gap-2 ">
          <Link
            href="/projects/new"
            className="p-2 px-4 rounded-lg hover:bg-zinc-100 dark:bg-zinc-900 hover:font-medium text-sm"
          >
            + New
          </Link>
        </div>
      </PageHeader>
      <Hero>
        <div className="grid gap-1 place-items-center">
          <h3 className="text-4xl font-medium">Projects Overview</h3>
          <p className="text-zinc-500">
            Preview, filter, and manage your projects.
          </p>
        </div>
      </Hero>

      <div className="grid gap-2 grid-cols-2 lg:grid-cols-4 auto-cols-max grid-flow-row">
        <MetricCard
          title="Projects"
          value={projects.length}
          Icon={BackpackIcon}
        />
        <MetricCard
          title="Cost"
          value={formatCurrency(total_cost, "SAR")}
          Icon={RocketIcon}
        />
        <MetricCard
          title="Paid"
          value={formatCurrency(0, "SAR")}
          Icon={CheckIcon}
        />
        <MetricCard
          title="Unpaid"
          value={formatCurrency(0, "SAR")}
          Icon={InfoCircledIcon}
        />
      </div>
      <div className="grid gap-2">
        <div className="flex items-center justify-between">
          <h3 className="font-medium text-lg">Projects</h3>
          <ProjectsFilter />
        </div>
        <ProjectsTable projects={projects} />
        {/* <div className="flex-1 flex flex-col gap-1">
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
        <div className="md:w-1/3 flex flex-col gap-2">
          <Button size={"sm"} variant={"outline"} disabled>
            Generate Report (PDF)
          </Button>
          <Separator className="my-4" />
          <h3 className="text-lg font-medium">Filters</h3>
        </div> */}
      </div>
    </Container>
  )
}
