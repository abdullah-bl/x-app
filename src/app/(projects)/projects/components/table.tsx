import { formatDistanceToNow } from "date-fns"
import Link from "next/link"
import StatusPreview from "~/components/custom/status"
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
import { formatCurrency } from "~/lib/utils"
import { Project } from "~/types"

export default function ProjectsTable({ projects }: { projects: Project[] }) {
  return (
    <Table className="border rounded-lg">
      <TableCaption>
        A list of projects with their details and status information
      </TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className=" w-max ">Name</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Created By</TableHead>
          <TableHead className="">Cost</TableHead>
          <TableHead>Last Updated</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {projects.map((project) => (
          <TableRow key={project.id}>
            <TableCell className="flex-1">
              <Link
                href={`/projects/${project.id}`}
                className="hover:underline"
              >
                {project.name}
              </Link>
            </TableCell>
            <TableCell>
              <StatusPreview status={project.expand?.status} />
            </TableCell>
            <TableCell>
              <Link
                href={`/users/${project.owner}`}
                className="hover:underline"
              >
                {project.expand?.owner.name}
              </Link>
            </TableCell>
            <TableCell>{formatCurrency(project.cost, "SAR")}</TableCell>
            <TableCell className="">
              {formatDistanceToNow(project.updated)}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
