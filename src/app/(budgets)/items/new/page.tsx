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

export default async function NewItemPage() {
  const allowed = await isAllowed("admin", "fm")
  if (!allowed) {
    return <div>Unauthorized</div>
  }

  const create = async (formData: FormData) => {
    "use server"
    try {
      const user = await getUserFromCookies()
      if (!user) {
        throw new Error("Unauthorized")
      }
      const data = Object.fromEntries(formData.entries())
      await client.collection("items").create<Item>(data)
      revalidatePath("/items")
    } catch (error) {
      console.error(error)
      throw new Error("Failed to create item")
    }
  }
  return (
    <Container>
      <PageHeader title="إضافة بند جديد" showBackButton />
      <div className="grid gap-0">
        <h3 className="font-medium text-lg">إضافة بند جديد</h3>
        <p className="text-sm">يمكنك إضافة بند جديدة من هنا</p>
      </div>
      <div className="flex gap-4 flex-wrap">
        <form action={create} className="grid gap-2 flex-1 md:w-1/2">
          <Label htmlFor="name">اسم النبد</Label>
          <Input
            id="name"
            name="name"
            type="text"
            required
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
              required
              placeholder="..."
            />
            <Input
              id="reference"
              name="reference"
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
              <ItemType />
            </div>
            <PickDate id="start_date" name="start_date" label="تاريخ البداية" />
            <PickDate id="end_date" name="end_date" label="تاريخ النهاية" />
          </div>
          <Label htmlFor="note">الملاحظات</Label>
          <Textarea id="note" name="note" placeholder="..." />
          <div className="flex items-center gap-4">
            <Button type="submit" size={"sm"}>
              إضافة بند جديد
            </Button>
            <Button type="reset" size={"sm"} variant={"secondary"}>
              إلغاء
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
