"use client"

import { useActionState, useEffect, useState } from "react"

import { toast } from "sonner"
import { DatePicker } from "../custom/date-picker"
import { Project } from "~/types"
import { Button } from "../ui/button"

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "~/components/ui/sheet"

import { Label } from "../ui/label"
import { updateProjectContract } from "~/actions/projects"
import { addDays } from "date-fns"
import { Pencil1Icon } from "@radix-ui/react-icons"

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
    if (state?.success) {
      toast.success(state.message)
      setOpen(false)
    } else if (state?.message) {
      toast.error(state.message)
    }
  }, [state])

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" className="gap-2">
          <Pencil1Icon /> Edit
        </Button>
      </SheetTrigger>
      <SheetContent className="sm:max-w-[425px]">
        <SheetHeader>
          <SheetTitle>Update Contract Details</SheetTitle>
          <SheetDescription>
            Update the contract details for the project
          </SheetDescription>
        </SheetHeader>
        <form className="grid gap-2 p-4 rounded-lg" action={formAction}>
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
            {state?.success ? "Updated" : "Save & Update"}
          </Button>
        </form>
      </SheetContent>
    </Sheet>
  )
}
