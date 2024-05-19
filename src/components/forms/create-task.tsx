"use client"

import { formatRelative } from "date-fns"
import { useCallback, useEffect, useRef, useState, useTransition } from "react"
import { toast } from "sonner"
import { createTask } from "~/actions/tasks"
import { SelectPriority, type Priority } from "~/components/custom/priority"
import { Button } from "~/components/ui/button"
import { Calendar } from "~/components/ui/calendar"
import { Label } from "~/components/ui/label"
import { CustomTextarea } from "../custom/textarea"

export default function CreateTaskForm() {
  const [isPending, startTransition] = useTransition()

  const [content, setContent] = useState<string>("")
  const [priority, setPriority] = useState<Priority>("none")
  const [due, setDue] = useState<Date | undefined>(undefined)
  const [time, setTime] = useState(due?.toLocaleTimeString() || "09:00")
  const [tags, setTags] = useState<string[]>([])
  const [assign, setAssign] = useState<string[]>([])

  const handleDateChange = useCallback(
    (date: Date | undefined) => {
      // get the time from time input
      const [hours, minutes] = time.split(":")
      console.log({ hours, minutes })
      date?.setHours(parseInt(hours, 10))
      date?.setMinutes(parseInt(minutes, 10))
      setDue(date)
    },
    [time]
  )

  const handleTimeChange = useCallback(
    (time: string) => {
      setTime(time)
      const [hours, minutes] = time.split(":")
      console.log({ hours, minutes })
      due?.setHours(parseInt(hours, 10))
      due?.setMinutes(parseInt(minutes, 10))
      setDue(due)
    },
    [due]
  )

  const handleCreateTask = async () => {
    startTransition(async () => {
      const form = new FormData()
      form.append("content", content)
      form.append("due", due?.toISOString() || "")
      form.append("priority", priority)
      form.append("tags", tags.join(","))
      form.append("assigned", assign.join(","))

      const { success, message } = await createTask(undefined, form)
      if (success) {
        toast.success(message)
        setDue(undefined)
        setPriority("none")
        setTags([])
        setAssign([])
        setContent("")
      } else {
        toast.error(message)
      }
    })
  }

  return (
    <div className="flex gap-4 flex-wrap flex-col md:flex-row p-2">
      <div className="grid gap-4 grid-cols-1 flex-1">
        <div className="border rounded-lg p-3 w-full h-fit grid gap-2">
          <div className="flex items-center justify-between">
            <span title="Due" className="text-sm font-medium">
              {due ? formatRelative(due, new Date()) : ""}
            </span>
            <DisplayPriority priority={priority} />
          </div>
          <CustomTextarea
            name="content"
            value={content}
            setValue={setContent}
            suggestions={["tag", "assign", "due", "priority", "tags"]}
            placeholder="What do you want to do?"
          />
          <div className="flex items-center justify-between">
            <span />
            <Button
              size={"sm"}
              type="button"
              onClick={handleCreateTask}
              disabled={content.trim().length < 5 || isPending}
            >
              {isPending ? "Creating..." : "Create Task"}
            </Button>
          </div>
        </div>
      </div>
      <div className="grid gap-4">
        <Label>Due Date</Label>
        <Calendar
          mode="single"
          selected={due}
          onSelect={handleDateChange}
          className="border rounded-lg"
        />
        <Label htmlFor="time">Time</Label>
        <input
          type="time"
          id="time"
          className="border rounded-lg px-2 py-1"
          defaultValue={time}
          onChange={(e) => handleTimeChange(e.target.value)}
        />
        <Label>Priority</Label>
        <SelectPriority
          value={priority}
          onValueChange={(value) => setPriority(value)}
        />
        <Label>Assign</Label>
        <Label>Tags</Label>
        {/* <CreatableSelect
        c
          options={[
            { value: "todo", label: "Todo" },
            { value: "list", label: "List" },
            { value: "task", label: "Task" },
          ]}
          isMulti
          className="bg-background text-foreground text-sm"
          placeholder="Add tags"
          value={tags.map((tag) => ({ value: tag, label: tag }))}
          onCreateOption={(tag) => setTags([...tags, tag])}
          onChange={(values) => setTags(values.map((v) => v.value))}
        /> */}
      </div>
    </div>
  )
}

const DisplayPriority = ({ priority }: { priority: Priority }) => (
  <span
    className={`w-4 h-4 rounded-full`}
    title={priority}
    data-priority={priority}
  />
)
