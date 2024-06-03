import { ArrowLeftIcon, ArrowRightIcon } from "@radix-ui/react-icons"
import Link from "next/link"
import { getBudgets } from "~/actions/budgets"
import CustomCard from "~/components/custom/card"
import Container from "~/components/layout/container"
import { PageHeader } from "~/components/layout/header"
import Hero from "~/components/layout/hero"
import { formatCurrency } from "~/lib/utils"

export default async function BudgetsPage({
  params: { year },
}: {
  params: { year: string }
}) {
  const budgets = await getBudgets({ year: parseInt(year) })

  const total_cash = budgets.reduce((acc, budget) => {
    return acc + budget.cash
  }, 0)
  const total_cost = budgets.reduce((acc, budget) => {
    return acc + budget.cost
  }, 0)

  return (
    <Container>
      <PageHeader title={`Budget (${year})`}>
        <div className="flex-1 flex items-center justify-end gap-1 ">
          <Link
            href={`/budgets/${parseInt(year) - 1}`}
            className="p-2 px-4 rounded-lg hover:bg-zinc-100 hover:dark:bg-zinc-900"
          >
            <ArrowLeftIcon /> {parseInt(year) - 1}
          </Link>
          <Link
            href={`/budgets/${parseInt(year) + 1}`}
            className="p-2 px-4 rounded-lg hover:bg-zinc-100 hover:dark:bg-zinc-900"
          >
            <ArrowRightIcon /> {parseInt(year) + 1}
          </Link>
        </div>
      </PageHeader>
      <div className="grid gap-2 grid-cols-1 sm:grid-cols-4 auto-cols-max grid-flow-row">
        <CustomCard title="Items" value={budgets.length} />
        <CustomCard title="Cash" value={formatCurrency(total_cash, "SAR")} />
        <CustomCard title="Cost" value={formatCurrency(total_cost, "SAR")} />
        <CustomCard title="P/C" value={formatCurrency(0, "SAR")} />
      </div>
    </Container>
  )
}
