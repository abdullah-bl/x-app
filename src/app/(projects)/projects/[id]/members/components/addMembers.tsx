import { Label } from "~/components/ui/label"
import { revalidatePath } from "next/cache"
import { Suspense } from "react"
import { createChange } from "~/actions/changes"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select"
import client from "~/lib/client"
import { User } from "~/types"
import { Button } from "~/components/ui/button"
import { RecordModel } from "pocketbase"

export default async function AddMembers({
  id,
  ownerId,
  members,
}: {
  id: string
  ownerId: string
  members: RecordModel[]
}) {
  const users = await client.collection("users").getFullList()

  const suggestions = users
    .filter(
      (user) => !members.find((member) => member.expand?.member.id === user.id)
    )
    .filter((user) => user.id !== ownerId)

  // add a member
  const AddMember = async (formData: FormData) => {
    "use server"
    try {
      const data = Object.fromEntries(formData)
      await client.collection("project_members").create(data)
      await createChange({
        target_id: id,
        action: "CREATE",
        user: ownerId,
        note: `added ${data.member} a member to the project.`,
      })
      revalidatePath(`/projects/${id}/settings/members`)
    } catch (error) {
      throw new Error("Something went wrong!, try agin.")
    }
  }
  return (
    <div className="grid gap-2 w-full border rounded-lg p-4">
      <div className="grid gap-0">
        <h3> أضف عضو </h3>
        <p className="text-sm text-zinc-500">أضف عضو جديد للمشروع.</p>
      </div>
      <form className="flex items-center gap-4 w-full" action={AddMember}>
        <input type="text" hidden value={id} name="project" />
        <Label htmlFor="member">اسم العضو</Label>
        <Select name="member" required>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="أختر عضو" />
          </SelectTrigger>
          <SelectContent id="member">
            <SelectGroup>
              <SelectLabel>Member ({suggestions.length})</SelectLabel>
              {suggestions.map((m) => (
                <SelectItem key={m.id} value={m.id}>
                  {m.name}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        <Label htmlFor="role">الصلاحية</Label>
        <Select name="role" required>
          <SelectTrigger>
            <SelectValue placeholder="اختر الصلاحية" />
          </SelectTrigger>
          <SelectContent id="role">
            <SelectGroup>
              <SelectItem value="read">قراءة</SelectItem>
              <SelectItem value="write">كتابة</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <Button
          variant={"default"}
          size={"sm"}
          type="submit"
          disabled={!ownerId}
        >
          أضف
        </Button>
      </form>
      <div />
    </div>
  )
}
