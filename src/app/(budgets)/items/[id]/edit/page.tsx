import { revalidatePath } from "next/cache"
import { ItemType } from "~/components/custom/itemType"
import { PickDate } from "~/components/custom/pickDate"
import Container from "~/components/layout/container"
import { PageHeader } from "~/components/layout/header"
import { Button } from "~/components/ui/button"
import { Input } from "~/components/ui/input"
import { Label } from "~/components/ui/label"
import { Textarea } from "~/components/ui/textarea"
import { getUserFromCookies, isAllowed } from "~/lib/auth"
import client from "~/lib/client"
import { Item } from "~/types"
import { getItemById } from "../page"
import { redirect } from "next/navigation"
import { BaseURL } from "~/lib/utils"
import {
  RedirectType,
  isRedirectError,
} from "next/dist/client/components/redirect"
import { navigate } from "~/actions"
import Unauthorized from "~/components/layout/Unauthorized"

export default async function EditItemPage({
  params: { id },
}: {
  params: { id: string }
}) {
  const allowed = await isAllowed(["fm"])
  if (!allowed) {
    return <Unauthorized />
  }

  const itemDetails = await getItemById(id)

  if (!itemDetails) {
    redirect("/items")
  }

  const update = async (formData: FormData) => {
    "use server"
    try {
      const user = await getUserFromCookies()
      if (!user) {
        throw new Error("Unauthorized")
      }
      const data = Object.fromEntries(formData.entries())
      await client.collection("items").update<Item>(id, data)
      revalidatePath(`/items`)
      return navigate(`/items/${id}`)
    } catch (error) {
      console.error(error)
      if (isRedirectError(error)) throw error
      throw new Error("Failed to update item")
    }
  }
  return (
    <Container>
      <PageHeader title={itemDetails.name} showBackButton />
      <div className="grid gap-0">
        <h3 className="font-medium text-lg">تحديث بيانات البند</h3>
        <p className="text-sm">يمكنك تحديث بيانات البند من هنا</p>
      </div>
      <div className="flex gap-4 flex-wrap">
        <form action={update} className="grid gap-2 flex-1 md:w-1/2">
          <Label htmlFor="name">اسم النبد</Label>
          <Input
            id="name"
            name="name"
            type="text"
            required
            defaultValue={itemDetails.name}
            placeholder="اكتب اسم البند ..."
            minLength={7}
          />
          <div className="grid gap-2 grid-cols-2">
            <Label htmlFor="number">رقم البند</Label>
            <Label htmlFor="reference">التصنيف الإقتصادي</Label>
            <Input
              id="number"
              name="number"
              type="number"
              defaultValue={itemDetails.number}
              required
              placeholder="..."
            />
            <Input
              id="reference"
              name="reference"
              defaultValue={itemDetails.reference}
              type="number"
              required
              placeholder="..."
            />
          </div>
          <Label htmlFor="description">الوصف</Label>
          <Textarea id="description" name="description" placeholder="..." />
          <div className="flex items-center gap-4">
            <div className="grid gap-2">
              <Label htmlFor="type">نوع البند</Label>
              <ItemType defaultValue={itemDetails.type} />
            </div>
            <PickDate
              id="start_date"
              name="start_date"
              label="تاريخ البداية"
              defaultValue={itemDetails?.start_date}
            />
            <PickDate
              id="end_date"
              name="end_date"
              label="تاريخ النهاية"
              defaultValue={itemDetails?.end_date}
            />
          </div>
          <Label htmlFor="note">الملاحظات</Label>
          <Textarea
            id="note"
            name="note"
            placeholder="..."
            defaultValue={itemDetails.note}
          />
          <div className="flex items-center gap-4">
            <Button type="submit" size={"sm"}>
              حفظ
            </Button>
          </div>
        </form>
        <div className="w-1/1 text-sm md:w-1/3 w-full flex flex-col gap-2 rounded-lg p-4 bg-zinc-50 dark:bg-zinc-900">
          <h3>تعليمات عامة:</h3>
          <p>املاء جميع الحقول</p>
          <div className="flex items-center gap-2"></div>
        </div>
      </div>
    </Container>
  )
}
