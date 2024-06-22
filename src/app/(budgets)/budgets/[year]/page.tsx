import { getBudgets } from "~/actions/budgets"
import MetricCard from "~/components/custom/metricCard"
import { getProjectObligations } from "~/data/projects"
import client from "~/lib/client"
import { formatCurrency } from "~/lib/utils"
import { Obligation } from "~/types"

const getObligations = async ({ year }: { year?: string }) => {
  try {
    return await client.collection("obligations").getFullList<Obligation>({
      filter: `created ~ "${year}"`,
      sort: "-created",
      expand: "budget, project",
    })
  } catch (error) {
    return []
  }
}

export default async function BudgetsPage({
  params: { year },
}: {
  params: { year: string }
}) {
  const obligations = await getObligations({ year })
  const budgets = await getBudgets({ year: parseInt(year) })

  const total_cash = budgets.reduce((acc, budget) => {
    return acc + budget.cash
  }, 0)
  const total_cost = budgets.reduce((acc, budget) => {
    return acc + budget.cost
  }, 0)

  const total_obligations_cash = obligations.reduce((acc, obligation) => {
    return acc + obligation.cash
  }, 0)

  const total_obligations_cost = obligations.reduce((acc, obligation) => {
    return acc + obligation.cost
  }, 0)

  return (
    <div className="grid gap-6">
      <div className="p-4 border rounded-lg aspect-[5/1]">...</div>
      <div className="grid gap-2 grid-cols-1 sm:grid-cols-4 auto-cols-max grid-flow-row">
        <MetricCard title="البنود" value={budgets.length} />
        <MetricCard title="السيولة" value={formatCurrency(total_cash, "SAR")} />
        <MetricCard
          title="التكاليف"
          value={formatCurrency(total_cost, "SAR")}
        />
        <MetricCard
          title="الاجمالي"
          value={formatCurrency(total_cash + total_cost, "SAR")}
        />
        <MetricCard title="المشاريع" value={budgets.length} />
        <MetricCard
          title="إجمال"
          value={formatCurrency(total_obligations_cash, "SAR")}
        />
        <MetricCard
          title="التكاليف"
          value={formatCurrency(total_obligations_cost, "SAR")}
        />
        <MetricCard
          title="الاجمالي"
          value={formatCurrency(
            total_obligations_cash + total_obligations_cost,
            "SAR"
          )}
        />
      </div>
    </div>
  )
}
