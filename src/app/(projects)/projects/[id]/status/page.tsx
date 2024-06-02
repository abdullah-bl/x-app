import { formatDistanceToNow } from "date-fns"
import Link from "next/link"
import { getProjectById, getProjectStatusHistory } from "~/data/projects"

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
  const project = await getProjectById(params.id)
  const histories = await getProjectStatusHistory(params.id)
  return (
    <div className="grid gap-4 border rounded-lg p-4">
      <div className="flex items-center justify-between">
        <h3 className="font-medium">Status History</h3>
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
          {histories.map((history) => (
            <TableRow key={history.id}>
              <TableCell className="font-medium">
                {history.expand?.status.seq}
              </TableCell>
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
