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
import client from "~/lib/client"
import { formatCurrency, formatDate } from "~/lib/utils"
import { getProjectById, getProjectObligations } from "~/data/projects"
import { Payment } from "~/types"

const getProjectPayments = async (id: string) => {
  try {
    return await client.collection("payments").getFullList<Payment>({
      filter: `project = "${id}"`,
      sort: "-updated",
      expand: "budget.item",
    })
  } catch (error) {
    return []
  }
}

export default async function ProjectBudgetsPage({
  params,
}: {
  params: { id: string }
}) {
  const project_cost = (await getProjectById(params.id)).cost
  const obligations = await getProjectObligations(params.id) // get budgets by project id
  const total = obligations.reduce(
    (acc, budget) => acc + budget.cash + budget.cost,
    0
  )

  const payments = await getProjectPayments(params.id)
  const total_paid = payments.reduce((acc, payment) => acc + payment.amount, 0)

  return (
    <div className="grid gap-4">
      <div className="p-4 grid gap-4">
        <div className="flex items-center justify-between">
          <div className="grid gap-0">
            <h3 className="font-medium text-lg">الميزانية و المدفوعات</h3>
            <p className="text-sm">إدارة ميزانية المشروع و المدفوعات.</p>
          </div>
        </div>
        <div className="grid gap-4">
          <div className="flex items-center justify-between">
            <h3 className="font-medium">المدفوعات</h3>
            {project_cost > total && <span>Add</span>}
          </div>
          <Table className="border">
            <TableCaption>A list of your recent invoices.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="">#</TableHead>
                <TableHead>البند</TableHead>
                <TableHead>الحالة</TableHead>
                <TableHead>المبلغ</TableHead>
                <TableHead>اخر تحديث</TableHead>
                <TableHead className="text-right"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {payments.map((payment, i) => (
                <TableRow key={payment.id}>
                  <TableCell className="w-fit">{i + 1}</TableCell>
                  <TableCell className="">
                    <Link
                      href={`/budgets/${payment.expand?.budget.year}/${payment.expand?.budget.item}`}
                    >
                      {payment.expand?.budget.expand?.item.name}
                    </Link>
                  </TableCell>
                  <TableCell>{payment.paid ? "Yes" : "No"}</TableCell>
                  <TableCell>{formatCurrency(payment.amount)}</TableCell>
                  <TableCell>{formatDate(payment.updated)}</TableCell>
                  <TableCell className="text-right">Edit</TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell colSpan={3}>الاجمالي</TableCell>
                <TableCell className="text-right">
                  {formatCurrency(total_paid)}
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </div>
        <div className="grid gap-4">
          <div className="flex items-center justify-between">
            <h3 className="font-medium">الارتباطات المالية</h3>
          </div>
          <Table className="border">
            <TableCaption>A list of your recent invoices.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="">#</TableHead>
                <TableHead className="">اسم البند</TableHead>
                <TableHead>السيولة</TableHead>
                <TableHead>التكاليف</TableHead>
                <TableHead className="">الإجمالي</TableHead>
                <TableHead className="">اخر تحديث</TableHead>
                <TableHead className="text-right"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {obligations.map((obligation, i) => (
                <TableRow key={obligation.id}>
                  <TableCell>{i + 1}</TableCell>
                  <TableCell className="">
                    <Link
                      href={`/budgets/${obligation.expand?.budget.year}/${obligation.expand?.budget.item}`}
                    >
                      {obligation.expand?.budget.expand?.item.name}
                    </Link>
                  </TableCell>
                  <TableCell>{formatCurrency(obligation.cash)}</TableCell>
                  <TableCell>{formatCurrency(obligation.cost)}</TableCell>
                  <TableCell>
                    {formatCurrency(obligation.cash + obligation.cost)}
                  </TableCell>
                  <TableCell>{formatDate(obligation.updated)}</TableCell>
                  <TableCell className="text-right">Edit</TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell colSpan={4}>الإجمالي</TableCell>
                <TableCell className="text-right">
                  {formatCurrency(total)}
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </div>
      </div>
    </div>
  )
}
