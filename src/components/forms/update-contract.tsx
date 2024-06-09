"use client"

import { useActionState, useEffect, useState } from "react"

import { toast } from "sonner"
import { DatePicker } from "../custom/date-picker"
import { Project } from "~/types"
import { Button } from "../ui/button"

import { Label } from "../ui/label"
import { updateProject, updateProjectContract } from "~/actions/projects"
import { addDays } from "date-fns"
import { CheckIcon, Pencil1Icon } from "@radix-ui/react-icons"
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
  const duration = project.duration ? project.duration * 30 : 0 // Convert months to days

  const [startDate, setStartDate] = useState<Date | undefined>(
    project?.start ? new Date(project.start) : new Date() // Set start date to today
  )

  const [endDate, setEndDate] = useState<Date | undefined>(
    project?.end ? new Date(project.end) : addDays(new Date(), duration ?? 0) // Set end date to today + duration
  )

  const [state, formAction] = useActionState(updateProject, {
    success: false,
    message: "",
  })

  useEffect(() => {
    if (startDate) {
      setEndDate(addDays(startDate, duration))
    }
  }, [startDate, duration])

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
        <Button variant="expandIcon" Icon={Pencil1Icon} iconPlacement="left">
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update Contract Details</DialogTitle>
          <DialogDescription>
            Update the contract details for the project
          </DialogDescription>
        </DialogHeader>
        <form className="grid gap-2 grid-cols-2 p-1" action={formAction}>
          <input hidden type="text" name="id" value={project.id} />

          <Label htmlFor="start">Start Date</Label>
          <DatePicker date={startDate} setDate={setStartDate} />
          <input
            hidden
            type="text"
            name="start"
            defaultValue={startDate?.toISOString()}
          />

          <Label htmlFor="end">
            End Date
            <span className="text-xs text-gray-500 dark:text-gray-400 block font-light">
              (Calculated based on duration)
            </span>
          </Label>
          <DatePicker date={endDate} setDate={setEndDate} />

          <input
            hidden
            type="text"
            name="end"
            defaultValue={endDate?.toISOString()}
          />
          <Button
            type="submit"
            variant="expandIcon"
            Icon={CheckIcon}
            iconPlacement="left"
            className="col-span-2"
          >
            {state?.success === true ? "Updated!" : "Update Contract"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
