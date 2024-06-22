"use client"

import { useEffect, useState } from "react"
import { useFormState } from "react-dom"
import { toast } from "sonner"
import { createBudget } from "~/actions/budgets"
import { Button } from "~/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog"
import { Input } from "~/components/ui/input"
import { Label } from "~/components/ui/label"
import { Textarea } from "~/components/ui/textarea"

export default function AddBudget({ itemId }: { itemId: string }) {
  const [state, formAction] = useFormState(createBudget, {
    success: false,
    message: "",
  })
  const [open, setOpen] = useState(false)
  useEffect(() => {
    if (state.success) {
      setOpen(false)
      toast.success(state.message)
    } else if (state.message !== "") {
      toast.error(state.message)
    }
  }, [state])
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>+ جديد</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>إنشاء سنة مالية جديد</DialogTitle>
          <DialogDescription>
            يمكنك إنشاء سنة مالية جديد من هنا
          </DialogDescription>
        </DialogHeader>
        <form className="grid gap-2" action={formAction}>
          <input type="text" name="item" defaultValue={itemId} hidden />
          <Label htmlFor="year">السنة المالية</Label>
          <Input
            id="year"
            name="year"
            type="number"
            required
            pattern=""
            min={2020}
          />

          <Label htmlFor="cash">السيولة</Label>
          <Input id="cash" name="cash" type="number" required pattern="" />
          <Label htmlFor="cost">التكاليف</Label>
          <Input id="cost" name="cost" type="number" required pattern="" />
          <Label htmlFor="note">الملاحظات</Label>
          <Textarea id="note" name="note" placeholder="اكتب ملاحظاتك هنا ..." />

          <div className="flex items-center gap-4 ">
            <Button size={"sm"} type="submit">
              إضافة سنة مالية جديدة
            </Button>
            <Button size={"sm"} type="reset" variant={"secondary"}>
              إلغاء
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
