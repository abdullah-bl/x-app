import { Task } from "~/types"
import TaskCard from "./card"

export default function TaskColumn({
  title,
  tasks,
}: {
  title: string
  tasks: Task[]
}) {
  return (
    <div className="flex flex-col gap-2">
      <h2 className="font-bold">{title}</h2>
      {tasks.length > 0 ? (
        tasks.map((task) => <TaskCard key={task.id} task={task} />)
      ) : (
        <p>No tasks found</p>
      )}
    </div>
  )
}
