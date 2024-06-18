"use client"

import { useActionState, useEffect, useState } from "react"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { uploadFile } from "~/actions/upload"
import { toast } from "sonner"
import {
  Dialog,
  DialogHeader,
  DialogTrigger,
  DialogTitle,
  DialogDescription,
  DialogContent,
} from "../ui/dialog"
import { UploadIcon } from "@radix-ui/react-icons"

export function UploadFile({ targetId }: { targetId: string }) {
  const [open, setOpen] = useState(false)
  const [state, dispatch] = useActionState(uploadFile, {
    success: false,
    message: "",
  })

  useEffect(() => {
    if (state?.success) {
      toast.success(state.message)
      setOpen(false)
    } else if (state?.message) {
      console.error(state.message)
      toast.error(state.message, {
        description: state.details.response?.data?.url?.message,
      })
    }
  }, [state])

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          size="sm"
          variant={"expandIcon"}
          iconPlacement="right"
          Icon={UploadIcon}
        >
          أضف ملف جديد
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>اضافة ملف جديد</DialogTitle>
          <DialogDescription>أضف ملف جديد</DialogDescription>
        </DialogHeader>
        <form className="grid gap-2 w-full" action={dispatch}>
          <div className="flex flex-col gap-2 flex-1">
            <Label htmlFor="name">اسم الملف</Label>
            <Input
              type="text"
              name="name"
              id="name"
              placeholder="اكتب اسم واضح للملف...."
              required
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="file">أختر الملف</Label>
            <Input
              type="file"
              name="file"
              id="file"
              required
              accept=".pdf,.docx,.xlsx,.xls,.doc,.txt,.csv,.ppt,.pptx"
            />
          </div>
          <div className="flex flex-col gap-2 justify-between ">
            <input type="hidden" name="target_id" value={targetId} />
            <Button type="submit" size={"sm"}>
              حفظ و إرسال
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
