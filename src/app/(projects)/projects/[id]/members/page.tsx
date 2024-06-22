import { getProjectById, getProjectMembers } from "~/data/projects"
import { formatDateTime } from "~/lib/utils"
import { User } from "~/types"
import client from "~/lib/client"
import { revalidatePath } from "next/cache"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select"
import { Label } from "~/components/ui/label"
import { Button } from "~/components/ui/button"
import { createChange } from "~/actions/changes"
import { Suspense } from "react"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table"
import { getUserFromCookies } from "~/lib/auth"
import AddMembers from "./components/addMembers"

export default async function ProjectMembersPage({
  params,
}: {
  params: { id: string }
}) {
  const user = await getUserFromCookies()
  const { id, expand, archived } = await getProjectById(params.id)
  const owner = expand?.owner as User
  const members = await getProjectMembers(params.id)

  // delete a member from the project
  const DeleteMember = async (formDate: FormData) => {
    "use server"
    try {
      const memberId = formDate.get("id") as string
      await client.collection("members").delete(memberId)
      await createChange({
        target_id: id,
        action: "DELETE",
        user: owner.id,
        note: `removed ${memberId} a member from the project.`,
      })
      revalidatePath(`/projects/${id}/settings/members`)
    } catch (error) {
      throw new Error("Something went wrong!, try agin.")
    }
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="grid gap-1 w-1/2">
        <h3 className="text-lg font-medium">ادارة الاعضاء</h3>
        <p className="text-sm text-zinc-500">إدارة اعضاء المشروع</p>
      </div>
      <div className="grid gap-6">
        {owner.id === user?.id && (
          <Suspense fallback={<div>Loading...</div>}>
            <AddMembers id={id} ownerId={owner.id} members={members} />
          </Suspense>
        )}

        <Table className="w-full border">
          <TableCaption>A list of project members.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="">#</TableHead>
              <TableHead>الأسم</TableHead>
              <TableHead>الصلاحية</TableHead>
              <TableHead className="text-right">تاريخ الانشاء</TableHead>
              <TableHead className="text-right"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="">1</TableCell>
              <TableCell className="font-medium">{owner?.name}</TableCell>
              <TableCell>المالك</TableCell>
              <TableCell className="text-right"></TableCell>
              <TableCell className="text-right">المالك</TableCell>
            </TableRow>
            {members.map((member, i) => (
              <TableRow key={member.invoice}>
                <TableCell className="font-medium">{i + 2}</TableCell>
                <TableCell>{member.expand?.member.name}</TableCell>
                <TableCell className="uppercase">{member.role}</TableCell>
                <TableCell className="text-right">
                  {formatDateTime(new Date(member.created))}
                </TableCell>
                <TableCell className="text-right">
                  <form action={DeleteMember}>
                    <input type="text" hidden name="id" value={member.id} />
                    <button type="submit" className="text-red-500 text-xs">
                      حذف
                    </button>
                  </form>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
