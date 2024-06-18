import Link from "next/link"
import { formatDateTime } from "~/lib/utils"
import { Task } from "~/types"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu"
import { DotsHorizontalIcon, DotsVerticalIcon } from "@radix-ui/react-icons"

export default async function TaskCard({ task }: { task: Task }) {
  return (
    <div className="border rounded-lg p-2 grid gap-1 relative">
      <span
        data-priority={task.priority}
        title={task.priority}
        className="w-4 h-4  rounded-full absolute -top-2 -left-2 "
      />
      <div className="flex items-center justify-between">
        <span className="font-medium text-sm">Due Date</span>
        <span className="text-sm">
          {task.dueDate ? formatDateTime(task.dueDate) : "N/A"}
        </span>
      </div>
      <p className=" text-wrap ">{task.content}</p>
      <div className="flex items-center justify-between">
        <Link
          href={`/users/${task.owner}`}
          className="w-6 h-6 rounded-full border text-center flex items-center justify-center"
        >
          {task.expand?.owner.name.split("")[0]}
        </Link>
        <div className="flex items-center gap-2">
          <span className="text-sm">{formatDateTime(task.created)}</span>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <DotsVerticalIcon />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Action</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>Change Statue</DropdownMenuSubTrigger>
                <DropdownMenuPortal>
                  <DropdownMenuSubContent>
                    <DropdownMenuItem disabled={task.status === "todo"}>
                      Todo
                    </DropdownMenuItem>
                    <DropdownMenuItem disabled={task.status === "inprogress"}>
                      In Progress
                    </DropdownMenuItem>
                    <DropdownMenuItem disabled={task.status === "done"}>
                      Done
                    </DropdownMenuItem>
                  </DropdownMenuSubContent>
                </DropdownMenuPortal>
              </DropdownMenuSub>
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>Assignee</DropdownMenuSubTrigger>
                <DropdownMenuPortal>
                  <DropdownMenuSubContent>
                    {task.expand?.assignee.map((assignee) => (
                      <DropdownMenuItem key={assignee.id}>
                        {assignee.name}
                      </DropdownMenuItem>
                    ))}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>More...</DropdownMenuItem>
                  </DropdownMenuSubContent>
                </DropdownMenuPortal>
              </DropdownMenuSub>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Delete</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  )
}
