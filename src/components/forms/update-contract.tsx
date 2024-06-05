"use client"

import { useActionState, useEffect, useState } from "react"

import { toast } from "sonner"
import { DatePicker } from "../custom/date-picker"
import { Project } from "~/types"
import { Button } from "../ui/button"

import { Label } from "../ui/label"
import { updateProjectContract } from "~/actions/projects"
import { addDays } from "date-fns"
import { Pencil1Icon } from "@radix-ui/react-icons"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog"

export default function UpdateProjectContract({
  project,
}: {
  project: Project
}) {
  const [open, setOpen] = useState(false)
  const duration = project.tender?.duration ? project.tender.duration * 30 : 0 // Convert months to days

  const [startDate, setStartDate] = useState<Date | undefined>(
    new Date(project?.contract?.start ?? new Date())
  )

  const [endDate, setEndDate] = useState<Date | undefined>(
    new Date(project?.contract?.end ?? addDays(new Date(), duration ?? 0))
  )

  const [state, formAction] = useActionState(updateProjectContract, {
    success: false,
    message: "",
  })

  useEffect(() => {
    if (state?.success === true) {
      toast.success(state.message)
      setOpen(false)
    } else if (state?.success === false && state.message) {
      toast.error(state.message)
    }
  }, [state])

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" className="gap-2">
          <Pencil1Icon /> Edit
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update Contract Details</DialogTitle>
          <DialogDescription>
            Update the contract details for the project
          </DialogDescription>
        </DialogHeader>
        <form className="grid gap-2 p-1" action={formAction}>
          <input type="hidden" name="project" value={project.id} />

          <Label htmlFor="start">Start Date</Label>
          <DatePicker date={startDate} setDate={setStartDate} />
          <input
            type="hidden"
            name="start"
            defaultValue={startDate?.toDateString()}
          />

          <Label htmlFor="end">End Date</Label>
          <DatePicker date={endDate} setDate={setEndDate} />
          <span className="text-xs text-gray-500 dark:text-gray-400">
            (Calculated based on duration)
          </span>
          <input
            type="hidden"
            name="end"
            defaultValue={endDate?.toDateString()}
          />
          <Button type="submit">
            {state?.success === true ? "Updated!" : "Save & Update"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
