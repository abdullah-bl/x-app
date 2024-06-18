import TaskColumn from "./components/column"
import client from "~/lib/client"
import { Task } from "~/types"

export const dynamic = "auto"

const getTasksByTarget = async (target: string) => {
  try {
    return await client.collection("tasks").getFullList<Task>({
      filter: `target ~ "${target}"`,
      expand: `assignee,owner`,
    })
  } catch (error) {
    console.error(error)
    return []
  }
}

export default async function ProjectTasksPage({
  params,
}: {
  params: { id: string }
}) {
  const tasks = await getTasksByTarget(`projects/${params.id}`)
  const todos = tasks.filter((task) => task.status === "todo")
  const inProgress = tasks.filter((task) => task.status === "inprogress")
  const done = tasks.filter((task) => task.status === "done")
  return (
    <div className="grid gap-4">
      <div className="flex items-center justify-between">
        <div className="grid gap-0">
          <h3 className="font-medium text-lg"> Project Tasks </h3>
          <p className="text-sm">
            A list of tasks that need to be done for this project.
          </p>
        </div>
        <button>Add</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 place-content-stretch overflow-scroll gap-4">
        <TaskColumn title="To Do" tasks={todos} />
        <TaskColumn title="In Progress" tasks={inProgress} />
        <TaskColumn title="Done" tasks={done} />
      </div>
    </div>
  )
}
