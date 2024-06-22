import { MagicWandIcon, PaperPlaneIcon } from "@radix-ui/react-icons"
import { revalidatePath } from "next/cache"
import { navigate } from "~/actions"
import { TenderType } from "~/components/custom/tenderType"
import Container from "~/components/layout/container"
import { PageHeader } from "~/components/layout/header"
import { Button } from "~/components/ui/button"
import { Input } from "~/components/ui/input"
import { Label } from "~/components/ui/label"
import { Textarea } from "~/components/ui/textarea"
import { getUserFromCookies } from "~/lib/auth"
import client from "~/lib/client"

export default async function NewProjectPage() {
  const createProject = async (formData: FormData) => {
    "use server"
    const user = await getUserFromCookies()
    if (!user) throw new Error("Unauthorized")
    try {
      const data = Object.fromEntries(formData)
      const project = await client.collection("projects").create({
        ...data,
        owner: user.id,
      })
      revalidatePath("/projects")
      return navigate(`/projects/${project.id}`)
    } catch (error) {
      console.log(error)
      throw new Error("Failed to create project")
    }
  }

  return (
    <Container>
      <PageHeader showBackButton title="مشروع جديد" />
      <div className="flex gap-2 flex-wrap" dir="rtl">
        <form
          action={createProject}
          className="grid gap-4 rounded-lg p-2 flex-1"
        >
          <div className="grid gap-2">
            <Label htmlFor="name">اسم المشروع</Label>
            <Input
              name="name"
              id="name"
              required
              autoFocus
              placeholder="اكتب اسم واضح للمشروع..."
              min={5}
              max={255}
              pattern=".{5,255}"
            />
          </div>
          <div className="grid gap-1">
            <Label htmlFor="description">الوصف</Label>
            <Textarea
              name="description"
              id="description"
              autoCapitalize="on"
              autoComplete="on"
              autoCorrect="on"
              placeholder="اكتب وصف مختصر للمشروع..."
            />
          </div>

          <div className="flex items-center  flex-wrap gap-2">
            <div className="grid gap-1">
              <Label htmlFor="cost">التكلفة الاجمالية</Label>
              <Input
                name="cost"
                id="cost"
                type="number"
                required
                defaultValue={0.0}
                placeholder="0"
                min={0.0}
                prefix="SAR"
                pattern="\d*"
                step={0.01}
              />
              <span className="text-xs text-zinc-500">التكلفة المتوقعة</span>
            </div>
            <div className="grid gap-1">
              <Label htmlFor="duration">المدة المتوقعة</Label>
              <Input
                name="duration"
                id="duration"
                type="number"
                required
                defaultValue={0}
                placeholder="0"
              />
              <span className="text-xs text-zinc-500">
                المدة المتوفعة بالاشهر
              </span>
            </div>
            <div className="grid gap-1">
              <Label htmlFor="tender_type">نوع الطرح</Label>
              <TenderType />
              <span className="text-xs text-zinc-500">اختر نوع الطرح</span>
            </div>
          </div>
          <div className="grid gap-2 max-w-xs"></div>
          <div className="grid gap-1">
            <Label htmlFor="tags">Tags</Label>
            <Input
              name="tags"
              id="tags"
              placeholder="Add tags..."
              // comma separated tags
              pattern="^([a-zA-Z0-9]+,)*[a-zA-Z0-9]+$"
            />
            <span className="text-xs text-zinc-500">
              Add tags separated by commas
            </span>
          </div>
          <div className="flex items-center gap-4">
            <Button type="submit" variant={"gooeyRight"} size={"sm"}>
              حفظ ونشر المشروع
            </Button>
            <Button type="reset" size={"sm"} variant={"outline"}>
              امسح الحقول
            </Button>
          </div>
        </form>
        <div className="w-1/1 text-sm md:w-1/3 w-full flex flex-col gap-2 rounded-lg p-4 bg-zinc-50 dark:bg-zinc-900">
          <h3>تعليمات عامة:</h3>
          <p>املاء جميع الحقول</p>
          <div className="flex items-center gap-2">
            <span className="text-sx">
              <MagicWandIcon />
            </span>
            <span className="text-xs">
              Click the magic wand to generate a description use AI
            </span>
          </div>
        </div>
      </div>
    </Container>
  )
}
