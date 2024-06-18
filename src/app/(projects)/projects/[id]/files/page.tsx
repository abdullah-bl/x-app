import { revalidatePath } from "next/cache"
import Link from "next/link"
import { UploadFile } from "~/components/forms/upload-file"

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table"

import { getFiles } from "~/data/files"
import { getProjectById, getProjectMembers } from "~/data/projects"
import { getUserFromCookies } from "~/lib/auth"
import client from "~/lib/client"
import { formatDateTime } from "~/lib/utils"

export default async function ProjectFilesPage({
  params,
}: {
  params: { id: string }
}) {
  const files = await getFiles(`project-${params.id}`)

  async function deleteFile(formData: FormData) {
    "use server"
    try {
      const user = await getUserFromCookies()
      if (!user) throw new Error("Not authenticated")

      const data = Object.fromEntries(formData)
      await client.collection("files").delete(data.fileId as string)
      revalidatePath(`/projects/${params.id}/files`)
    } catch (error) {
      console.error(error)
      throw new Error("Failed to delete file")
    }
  }
  return (
    <div className="grid gap-2">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-1">
          <h3 className="text-lg font-medium">الملفات ({files.length})</h3>
          <p className="text-foreground">جميع الملفات الخاصة بالمشروع</p>
        </div>
        <UploadFile targetId={`project-${params.id}`} />
      </div>

      <Table className="border">
        <TableCaption>جميع الملفات الخاصة بالمشروع.</TableCaption>
        <TableHeader>
          <TableRow className="">
            <TableHead className="w-fit">#</TableHead>
            <TableHead>اسم الملف</TableHead>
            <TableHead>بواسطة</TableHead>
            <TableHead>تاريخ الإنشاء</TableHead>
            <TableHead className="text-right"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {files.map((file, i) => (
            <TableRow key={file.id}>
              <TableCell className="w-fit">{i + 1}</TableCell>
              <TableCell className="w-fit">
                <Link href={`/api/files/files/${file.id}/${file.url}`}>
                  {file.name}
                </Link>
              </TableCell>
              <TableCell>
                <Link href={`/users/${file.owner}`} className="text-sm">
                  {file.expand?.owner.name}
                </Link>
              </TableCell>
              <TableCell className="">
                {formatDateTime(new Date(file.created))}
              </TableCell>
              <TableCell className="text-right">
                <form action={deleteFile}>
                  <input type="hidden" name="fileId" value={file.id} hidden />
                  <button type="submit" className="text-red-500 text-sm">
                    حذف
                  </button>
                </form>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
