import { redirect } from "next/navigation"

export default async function BudgetsPage() {
  const year = new Date().getFullYear()
  return redirect(`/budgets/${year}`)
}
