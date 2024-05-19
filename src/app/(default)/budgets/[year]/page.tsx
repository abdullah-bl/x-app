import { ArrowLeftIcon } from "@radix-ui/react-icons"
import Link from "next/link"
import { getBudgets } from "~/actions/budgets"
import CustomCard from "~/components/custom/card"
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
    <div className="grid gap-6">
      <Hero className="flex items-center justify-between aspect-[5/1] p-4">
        <Link href={`/budgets/${parseInt(year) - 1}`}>
          <ArrowLeftIcon className="w-6 h-6 cursor-pointer" />
        </Link>
        <h3 className="text-2xl font-medium">Budgets ({year})</h3>
        <Link href={`/budgets/${parseInt(year) + 1}`}>
          <ArrowLeftIcon className="w-6 h-6 cursor-pointer transform rotate-180" />
        </Link>
      </Hero>
      <div className="grid gap-2 grid-cols-1 sm:grid-cols-4 auto-cols-max grid-flow-row">
        <CustomCard title="Items" value={budgets.length} />
        <CustomCard title="Cash" value={formatCurrency(total_cash, "SAR")} />
        <CustomCard title="Cost" value={formatCurrency(total_cost, "SAR")} />
        <CustomCard title="P/C" value={formatCurrency(0, "SAR")} />
      </div>
    </div>
  )
}
