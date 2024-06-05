import { formatDistanceToNow } from "date-fns"
import Link from "next/link"
import { getProjectStatusHistory } from "~/data/projects"

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table"

export default async function ProjectStatusHistory({
  params,
}: {
  params: { id: string }
}) {
  const histories = await getProjectStatusHistory(params.id)
  return (
    <div className="grid gap-4">
      <div className="grid gap-1">
        <h3 className="text-lg font-medium">Statuses History</h3>
        <p className="text-sm text-zinc-500">
          A list of recent status changes made to this project.
        </p>
      </div>
      <Table>
        <TableCaption>A list of your recent status update.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>#</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Note</TableHead>
            <TableHead>By</TableHead>
            <TableHead className=" text-center ">Created</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {histories.map((history, i) => (
            <TableRow key={history.id}>
              <TableCell className="font-medium">{i + 1}</TableCell>
              <TableCell className="font-medium">
                {history.expand?.status.name}
              </TableCell>
              <TableCell className="flex-1">{history.note}</TableCell>
              <TableCell>
                <Link href={`/users/${history.owner}`}>
                  {history.expand?.owner.name}
                </Link>
              </TableCell>
              <TableCell className="text-center">
                {formatDistanceToNow(new Date(history.created))}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
