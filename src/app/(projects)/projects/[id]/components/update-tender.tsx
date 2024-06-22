"use client"

import { useActionState, useEffect, useState } from "react"

import { toast } from "sonner"
import { DatePicker } from "../../../../../components/custom/date-picker"
import { Project } from "~/types"
import { Button } from "../../../../../components/ui/button"

import { Label } from "../../../../../components/ui/label"
import { Input } from "../../../../../components/ui/input"
import { updateProjectDetails } from "~/actions/projects"
import { CheckIcon, Pencil1Icon } from "@radix-ui/react-icons"
import { TenderType } from "../../../../../components/custom/tenderType"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../../../components/ui/dialog"

export default function UpdateProjectDetails({
  project,
}: {
  project: Project
}) {
  const [open, setOpen] = useState(false)

  const [submissionDate, setSubmissionDate] = useState<Date | undefined>(
    project?.submissionDate ? new Date(project.submissionDate) : new Date()
  )

  const [openingDate, setOpeningDate] = useState<Date | undefined>(
    project?.openingDate ? new Date(project.openingDate) : new Date()
  )

  const [awardedDate, setAwardedDate] = useState<Date | undefined>(
    project?.awardedDate ? new Date(project.awardedDate) : new Date()
  )

  const [startDate, setStartDate] = useState<Date | undefined>(
    project?.startDate ? new Date(project.startDate) : new Date()
  )

  const [state, formAction] = useActionState(updateProjectDetails, {
    success: false,
    message: "",
  })

  useEffect(() => {
    if (state.success === true) {
      toast.success(state.message)
      setOpen(false)
    } else if (state?.success === false && state.message) {
      toast.error(state.message)
    }
  }, [state])

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="expandIcon" Icon={Pencil1Icon} iconPlacement="right">
          تعديل التفاصيل
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>تحديث تفاصيل المشروع {project?.number}</DialogTitle>
          <DialogDescription>
            يمكنك تحديث البيانات الخاصة بالمشروع
          </DialogDescription>
        </DialogHeader>
        <form className="grid gap-2 " action={formAction}>
          <input type="hidden" name="id" value={project.id} />
          <div className="grid grid-cols-2 gap-1  align-middle">
            <Label htmlFor="number">الرقم المختصر</Label>
            <Input
              type="text"
              id="number"
              name="number"
              defaultValue={project?.number}
              placeholder="Tender Number e.g. 1234/24"
            />
            <Label htmlFor="reference">الرقم المرحعي</Label>
            <Input
              type="text"
              id="reference"
              name="reference"
              placeholder="Reference Number e.g. 1234567890"
              defaultValue={project?.reference}
              min={0}
              maxLength={10}
            />
            <Label htmlFor="submissionDate">تاريخ الطرح</Label>
            <DatePicker date={submissionDate} setDate={setSubmissionDate} />
            <input
              type="hidden"
              name="submissionDate"
              defaultValue={submissionDate?.toISOString()}
            />

            <Label htmlFor="openingDate">تاريخ فتح العروض</Label>
            <DatePicker date={openingDate} setDate={setOpeningDate} />
            <input
              type="hidden"
              name="openingDate"
              defaultValue={openingDate?.toISOString()}
            />

            <Label htmlFor="awardedDate">تاريخ إشعار الترسية</Label>
            <DatePicker date={awardedDate} setDate={setAwardedDate} />
            <input
              type="hidden"
              name="awardedDate"
              defaultValue={awardedDate?.toISOString()}
            />

            <Label htmlFor="startDate">تأريخ بداية المشروع</Label>
            <DatePicker date={startDate} setDate={setStartDate} />
            <input
              type="hidden"
              name="startDate"
              defaultValue={startDate?.toISOString()}
            />

            <Label htmlFor="duration">مدة المشروع</Label>
            <Input
              id="duration"
              type="number"
              name="duration"
              min={0}
              defaultValue={project?.duration}
              placeholder="المدة في الاشهر"
            />

            <Label htmlFor="type">نوع المنافسة</Label>
            <TenderType defaultValue={project?.type} />
          </div>
          <Button
            type="submit"
            variant="expandIcon"
            Icon={CheckIcon}
            iconPlacement="right"
          >
            {state?.success === true ? "تم التعديل!" : "تعديل بيانات المشروع"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
