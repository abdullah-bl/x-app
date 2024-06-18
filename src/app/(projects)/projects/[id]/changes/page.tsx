import { getChanges } from "~/actions/changes"

import { formatDistanceToNow } from "date-fns"

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table"
import Link from "next/link"
import { getProjectStatusHistory } from "~/data/projects"

export default async function ProjectChanges({
  params,
  searchParams,
}: {
  params: { id: string }
  searchParams: {
    page: number
    perPage: number
  }
}) {
  const changes = await getChanges({
    page: searchParams.page || 1,
    perPage: searchParams.perPage || 30,
    target_id: params.id,
  })
  const histories = await getProjectStatusHistory(params.id)

  return (
    <div className="grid gap-2">
      <div className="grid gap-1">
        <h3 className="text-lg font-medium">Statuses History</h3>
        <p className="text-sm text-zinc-500">
          A list of recent status changes made to this project.
        </p>
      </div>
      <Table className="border rounded-lg">
        <TableCaption>A list of your recent status update.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>#</TableHead>
            <TableHead>الحالة</TableHead>
            <TableHead>الملاحظة</TableHead>
            <TableHead>بواسطة</TableHead>
            <TableHead className="">تاريخ الإنشاء</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {histories.map((history, i) => (
            <TableRow key={history.id}>
              <TableCell className="">{i + 1}</TableCell>
              <TableCell className="font-medium">
                {history.expand?.status.name}
              </TableCell>
              <TableCell className="flex-1">{history.note}</TableCell>
              <TableCell>
                <Link href={`/users/${history.owner}`}>
                  {history.expand?.owner.name}
                </Link>
              </TableCell>
              <TableCell className="">
                {formatDistanceToNow(new Date(history.created))}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="grid gap-1">
        <h3 className="text-lg font-medium">أخر التحديثات</h3>
        <p className="text-sm text-zinc-500">
          A list of recent changes made to this project.
        </p>
      </div>
      <Table className="w-full border rounded-lg">
        <TableCaption>A list of recent changes.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>#</TableHead>
            <TableHead>النشاط</TableHead>
            <TableHead>الملاحظات</TableHead>
            <TableHead>بواسطة</TableHead>
            <TableHead className="">تاريخ الإنشاء</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {changes.items.map((change, index) => (
            <TableRow key={change.id}>
              <TableCell className="">{index + 1}</TableCell>
              <TableCell className="font-medium">{change.action}</TableCell>
              <TableCell className="flex-1">{change.note}</TableCell>
              <TableCell>
                <Link href={`/users/${change.user}`}>
                  {change.expand?.user.name}
                </Link>
              </TableCell>
              <TableCell className="text-center">
                {formatDistanceToNow(new Date(change.created!))}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
