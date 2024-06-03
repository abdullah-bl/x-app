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
  return (
    <div className="grid gap-2 p-2">
      <div className="grid gap-2">
        <h3 className="text-lg font-medium">Recent Changes</h3>
        <p className="text-sm text-zinc-500">
          A list of recent changes made to this project.
        </p>
      </div>
      <Table className="w-full">
        <TableCaption>A list of recent changes.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>#</TableHead>
            <TableHead>Action</TableHead>
            <TableHead>Note</TableHead>
            <TableHead>By</TableHead>
            <TableHead className="text-center">Created</TableHead>
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
