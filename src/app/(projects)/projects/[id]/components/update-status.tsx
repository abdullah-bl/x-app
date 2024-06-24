"use client"

import { useActionState, useEffect, useState } from "react"
import { updateProjectStatus } from "~/actions/projects"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../../../components/ui/select"
import { toast } from "sonner"
import { Textarea } from "../../../../../components/ui/textarea"
import { Status } from "~/types"
import { Button } from "../../../../../components/ui/button"

import { CheckIcon, Pencil1Icon } from "@radix-ui/react-icons"
import { Label } from "../../../../../components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../../../components/ui/dialog"
import StatusPreview from "../../../../../components/custom/status"

export default function UpdateProjectStatus({
  disabled,
  currentStatus,
  projectId,
}: {
  disabled: boolean
  currentStatus: Status | undefined
  projectId: string
}) {
  const [open, setOpen] = useState(false)
  const [statuses, setStatuses] = useState<Status[]>([]) // [Status
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
      <DialogTrigger asChild disabled={disabled}>
        <Button
          disabled={disabled}
          variant="expandIcon"
          Icon={Pencil1Icon}
          iconPlacement="right"
        >
          {currentStatus ? (
            <StatusPreview status={currentStatus} />
          ) : (
            "تغيير الحالة"
          )}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader className="grid gap-1">
          <DialogTitle className="font-medium">تعديل حالة المشروع</DialogTitle>
          <DialogDescription>يمكن تعديل حالة المشروع</DialogDescription>
        </DialogHeader>
        <form className="grid gap-2" action={formAction}>
          <Label htmlFor="status">الحالة</Label>
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
          <Label htmlFor="note">الملاحظات</Label>
          <Textarea name="note" id="note" required placeholder="اكتب..." />
          <input type="hidden" name="project" value={projectId} />
          <Button disabled={disabled} type="submit" variant="default">
            {state?.success === true ? "تم التعديل" : "حدث حالة المشروع"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
