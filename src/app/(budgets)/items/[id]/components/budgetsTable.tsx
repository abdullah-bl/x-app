import Link from "next/link"
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
import { Budget, Item } from "~/types"
import UpdateBudget from "./updateBudget"

export function BudgetsTable({ budgets }: { budgets: Budget[] }) {
  const total_cash = budgets.reduce((acc, budget) => {
    return acc + budget.cash
  }, 0)
  const total_cost = budgets.reduce((acc, budget) => {
    return acc + budget.cost
  }, 0)
  return (
    <Table className="border">
      <TableCaption>الميزانية المعتمدة للبند</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="">#</TableHead>
          <TableHead>السنة المالية</TableHead>
          <TableHead>السيولة</TableHead>
          <TableHead>التكاليف</TableHead>
          <TableHead>الملاحظات</TableHead>
          <TableHead></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {budgets?.map((budget, i) => (
          <TableRow key={budget.id}>
            <TableCell className="">{i + 1}</TableCell>
            <TableCell>{budget.year}</TableCell>
            <TableCell>{formatCurrency(budget.cash, "SAR")}</TableCell>
            <TableCell>{formatCurrency(budget.cost, "SAR")}</TableCell>
            <TableCell>{budget.note}</TableCell>
            <TableCell>
              <UpdateBudget budget={budget} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={2}>الاجمالي</TableCell>
          <TableCell className="">{formatCurrency(total_cash)}</TableCell>
          <TableCell className="">{formatCurrency(total_cost)}</TableCell>
          <TableCell className="">
            {formatCurrency(total_cash + total_cost)}
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  )
}
