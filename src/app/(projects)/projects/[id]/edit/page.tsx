import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { navigate } from "~/actions"
import { createChange } from "~/actions/changes"
import { updateProject } from "~/actions/projects"
import { TenderType } from "~/components/custom/tenderType"
import { Button } from "~/components/ui/button"
import { Input } from "~/components/ui/input"
import { Label } from "~/components/ui/label"
import { Switch } from "~/components/ui/switch"
import { Textarea } from "~/components/ui/textarea"
import { getProjectById } from "~/data/projects"
import { getUserFromCookies } from "~/lib/auth"
import client from "~/lib/client"
import { User } from "~/types"

export default async function EditPage({
  params: { id },
}: {
  params: { id: string }
}) {
  const user = (await getUserFromCookies()) as User
  const project = await getProjectById(id)

  if (user.id != project.owner) {
    redirect(`/projects/${id}`)
  }

  const update = async (formData: FormData) => {
    "use server"
    try {
      const data = Object.fromEntries(formData)
      await client.collection("projects").update(id, data)
      await createChange({
        target_id: id,
        action: "UPDATE",
        user: user.id,
        note: "Project details has been updated",
      })
      revalidatePath(`/projects/${id}`)
      return navigate(`/projects/${id}`)
    } catch (error) {
      throw new Error("Failed to update project")
    }
  }

  const toggleProject = async (formData: FormData) => {
    "use server"
    try {
      await client.collection("projects").update(id, {
        archived: !project.archived,
      })
      await createChange({
        action: "UPDATE",
        target_id: id,
        user: user.id,
        note: "Project has been Archived By the Owner!",
      })
      revalidatePath(`/projects/${id}`)
      return navigate(`/projects/${id}`)
    } catch (error) {
      throw new Error("Failed to archive project!")
    }
  }

  return (
    <div className="grid gap-6 mx-auto max-w-2xl">
      <form className="grid gap-2 p-6 border rounded-lg" action={update}>
        <h3 className="font-medium">تعديل بيانات المشروع</h3>
        <Label htmlFor="name">اسم المشروع</Label>
        <Input
          id="name"
          name="name"
          required
          defaultValue={project.name}
          placeholder="Enter the project name"
        />
        <Label htmlFor="description">الوصف</Label>
        <Textarea
          id="description"
          name="description"
          defaultValue={project.description}
        />
        <div className="grid gap-2 grid-cols-2">
          <Label htmlFor="cost">الاجمالي</Label>
          <Label htmlFor="tags">Tags</Label>
          <Input
            id="cost"
            name="cost"
            type="number"
            defaultValue={project.cost}
            placeholder="Enter the project cost"
            pattern="\d*"
            min={0}
            step={0.01}
          />
          <Input
            id="tags"
            name="tags"
            defaultValue={project.tags}
            placeholder="Enter project tags"
          />
        </div>
        <div className="flex items-center">
          <Button variant="gooeyRight" type="submit">
            حفظ التعديلات
          </Button>
        </div>
      </form>

      <form action={toggleProject} className="grid gap-1 border rounded-lg p-4">
        <h3 className="font-medium">ارشف المشروع</h3>
        <div className="flex gap-1 items-start justify-between">
          <p className="text-sm">أرشف المشروع لإخفائه من قائمة المشاريع.</p>
          <Button
            type="submit"
            variant={project.archived ? "ghost" : "destructive"}
          >
            {project.archived ? "إلغاء الأرشفة" : "أرشف"}
          </Button>
        </div>
      </form>
    </div>
  )
}
