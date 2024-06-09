import Container from "~/components/layout/container"
import { PageHeader } from "~/components/layout/header"
import FilterTasks from "./components/filter"
import client from "~/lib/client"

const getTasks = async ({
  due = new Date().toISOString(),
}: {
  due?: string
}) => {
  try {
    console.log(due)
    const filter = []
    if (due) filter.push(`due~"${due}"`)
    return await client.collection("tasks").getFullList({
      filter: filter.join("&&"),
      expand: "assigned,owner,completed_by",
    })
  } catch (error) {
    console.error(error)
    return []
  }
}

export default async function TasksPage({
  searchParams,
}: {
  searchParams: {
    due: string
  }
}) {
  const tasks = await getTasks({
    due: searchParams.due,
  })
  return (
    <Container>
      <div className="flex-1 flex gap-2 overflow-hidden flex-wrap">
        <div className="flex flex-col gap-4 flex-1">
          <PageHeader title="Tasks Page">
            <div className="flex items-center justify-end flex-1">new</div>
          </PageHeader>
          <div className="flex items-center justify-between">
            <span className="text-lg">Upcoming Tasks</span>
          </div>
          <div className="flex-1 p-2 flex flex-col gap-2">
            {tasks.map((task) => (
              <div className="grid gap-1 border rounded-md p-2" key={task.id}>
                <p className="text-lg">{task.task}</p>
                <span className="text-sm">12:00 PM</span>
                <div className="flex items-center justify-between">
                  <span className="text-sm">
                    Assigned to: {task.assigned.length}
                  </span>
                  <span className="text-sm">Priority: {task.priority}</span>
                </div>
              </div>
            ))}
            <div className="flex items-center justify-between">
              <span className="text-lg">Event 2</span>
              <span className="text-sm">1:00 PM</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-lg">Event 3</span>
              <span className="text-sm">2:00 PM</span>
            </div>
          </div>
        </div>
        <div className="flex w-full lg:w-fit p-2">
          <FilterTasks />
        </div>
      </div>
    </Container>
  )
}
