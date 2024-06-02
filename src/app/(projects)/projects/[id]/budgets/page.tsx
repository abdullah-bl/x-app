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
import { getProjectBudgets, getProjectById, getProjects } from "~/data/projects"
import { formatCurrency } from "~/lib/utils"

export default async function ProjectBudgetsPage({
  params,
}: {
  params: { id: string }
}) {
  const project_cost = (await getProjectById(params.id)).cost
  const budgets = await getProjectBudgets(params.id) // get budgets by project id
  const total = budgets.reduce(
    (acc, budget) => acc + budget.cash + budget.cost,
    0
  )
  return (
    <div className="grid gap-4">
      <div className="p-4 grid gap-4">
        <div className="flex items-center justify-between">
          <h3 className="font-medium text-lg">Budgets</h3>
          {project_cost > total && <span>Add</span>}
        </div>
        <Table>
          <TableCaption>A list of your recent invoices.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="">Item</TableHead>
              <TableHead>Cash</TableHead>
              <TableHead>Cost</TableHead>
              <TableHead className="">Total</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {budgets.map((budget) => (
              <TableRow key={budget.id}>
                <TableCell className="w-full">
                  {budget.expand?.budget.expand?.item.name}
                </TableCell>
                <TableCell>{formatCurrency(budget.cash)}</TableCell>
                <TableCell>{formatCurrency(budget.cost)}</TableCell>
                <TableCell>
                  {formatCurrency(budget.cash + budget.cost)}
                </TableCell>
                <TableCell className="text-right">Edit</TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={3}>Total</TableCell>
              <TableCell className="text-right">
                {formatCurrency(total)}
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
    </div>
  )
}
