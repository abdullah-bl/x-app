"use client"

import { useActionState, useEffect, useState } from "react"
import { updateProjectStatus } from "~/actions/projects"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select"
import { toast } from "sonner"
import { Textarea } from "../ui/textarea"
import { DatePicker } from "../custom/date-picker"
import { Status } from "~/types"
import { Button } from "../ui/button"

import { Pencil1Icon } from "@radix-ui/react-icons"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { Label } from "../ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog"

export default function UpdateProjectStatus({
  currentStatus,
  projectId,
}: {
  currentStatus: Status | undefined
  projectId: string
}) {
  const [open, setOpen] = useState(false)
  const [statuses, setStatuses] = useState<Status[]>([]) // [Status
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [state, formAction] = useActionState(updateProjectStatus, {
    success: false,
    message: "",
  })

  useEffect(() => {
    getStatuses()
  }, [])

  useEffect(() => {
    if (state?.success === true) {
      toast.success(state.message)
      setOpen(false)
    } else if (state?.success === false && state.message) {
      toast.error(state.message)
    }
  }, [state])

  const getStatuses = async () => {
    const response = await fetch("/api/statuses")
    const { statuses } = await response.json()
    setStatuses(statuses)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" className="gap-2">
          <Pencil1Icon /> {currentStatus?.name || "Update Status"}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader className="grid gap-1">
          <DialogTitle className="font-medium">
            Update Project Status
          </DialogTitle>
          <DialogDescription>
            Update the status of this project.
          </DialogDescription>
        </DialogHeader>
        <form className="grid gap-2" action={formAction}>
          <Label htmlFor="status">Status</Label>
          <Select defaultValue={currentStatus?.id} name="status">
            <SelectTrigger className="">
              <SelectValue placeholder="Statuses" />
            </SelectTrigger>
            <SelectContent>
              {statuses.map((status) => (
                <SelectItem key={status.id} value={status.id}>
                  {status.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Label htmlFor="note">Note</Label>
          <Textarea
            name="note"
            id="note"
            required
            placeholder="Write something..."
          />
          <Label htmlFor="timestamp">When ?</Label>
          <DatePicker date={date} setDate={setDate} title="When ?" />
          <input
            hidden
            type="text"
            name="timestamp"
            defaultValue={date?.toDateString()}
          />
          <input type="hidden" name="project" value={projectId} />
          <Button type="submit">Update</Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
