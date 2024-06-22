import Link from "next/link"
import Filter from "./components/filter"
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
      {/* <PageHeader title="المشاريع">
        <div className="flex-1 flex items-center justify-end gap-2 ">
          <Link
            href="/projects/new"
            className="p-2 px-4 rounded-lg hover:bg-zinc-100 dark:bg-zinc-900 hover:font-medium text-sm"
          >
            + مشروع جديد
          </Link>
        </div>
      </PageHeader> */}
      <Hero>
        <div className="grid gap-1 place-items-center">
          <h3 className="text-4xl font-medium">ملخص المشاريع</h3>
          <p className="text-zinc-500">
            يمكنك تصفح وإدارة جميع المشاريع الموجودة في النظام
          </p>
        </div>
      </Hero>

      <div className="grid gap-2 grid-cols-2 lg:grid-cols-4 auto-cols-max grid-flow-row">
        <MetricCard
          title="المشاريع"
          value={projects.length}
          Icon={BackpackIcon}
        />
        <MetricCard
          title="التكلفة الاجمالية"
          value={formatCurrency(total_cost, "SAR")}
          Icon={RocketIcon}
        />
        <MetricCard
          title="المدفوع"
          value={formatCurrency(0, "SAR")}
          Icon={CheckIcon}
        />
        <MetricCard
          title="المتبقي"
          value={formatCurrency(0, "SAR")}
          Icon={InfoCircledIcon}
        />
      </div>
      <div className="grid gap-2">
        <div className="flex items-center justify-between">
          <h3 className="font-medium text-lg">المشاريع</h3>
          <Filter />
        </div>
        <ProjectsTable projects={projects} />
      </div>
    </Container>
  )
}
