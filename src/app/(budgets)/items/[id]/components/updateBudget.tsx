"use client"

import { useEffect, useState } from "react"
import { useFormState } from "react-dom"
import { toast } from "sonner"
import { updateBudget } from "~/actions/budgets"
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
import { Budget } from "~/types"

export default function UpdateBudget({ budget }: { budget: Budget }) {
  const [state, formAction] = useFormState(updateBudget, {
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
  }, [open, state])

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>تعديل</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>تعديل السنة المالية </DialogTitle>
          <DialogDescription>
            يمكنك تعديل السنة المالية من هنا
          </DialogDescription>
        </DialogHeader>
        <form className="grid gap-2" action={formAction}>
          <input type="text" name="id" defaultValue={budget.id} hidden />
          <input type="text" name="item" defaultValue={budget.item} hidden />
          <Label htmlFor="year">السنة المالية</Label>
          <Input
            id="year"
            name="year"
            type="number"
            required
            pattern=""
            min={2020}
            defaultValue={budget.year}
          />

          <Label htmlFor="cash">السيولة</Label>
          <Input
            id="cash"
            name="cash"
            type="number"
            required
            pattern=""
            defaultValue={budget.cash}
          />
          <Label htmlFor="cost">التكاليف</Label>
          <Input
            id="cost"
            name="cost"
            type="number"
            required
            pattern=""
            defaultValue={budget.cost}
          />
          <Label htmlFor="note">الملاحظات</Label>
          <Textarea
            id="note"
            name="note"
            placeholder="اكتب ملاحظاتك هنا ..."
            defaultValue={budget.note}
          />

          <div className="flex items-center gap-4 ">
            <Button size={"sm"} type="submit">
              تعديل السنة المالية
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
