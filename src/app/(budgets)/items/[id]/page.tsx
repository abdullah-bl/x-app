import Link from "next/link"
import { redirect } from "next/navigation"
import Container from "~/components/layout/container"
import { PageHeader } from "~/components/layout/header"
import { getUserFromCookies } from "~/lib/auth"
import client from "~/lib/client"
import { Budget, Item } from "~/types"
import { BudgetsTable } from "./components/budgetsTable"
import AddBudget from "./components/addBudget"
import { revalidatePath } from "next/cache"
import { navigate } from "~/actions"

export const getItemById = async (id: string) => {
  try {
    await getUserFromCookies()
    return await client.collection("items").getOne<Item>(id)
  } catch (error) {
    return null
  }
}

export const getItemBudgets = async (id: string) => {
  try {
    await getUserFromCookies()
    return await client.collection("budgets").getFullList<Budget>({
      filter: `item = "${id}"`,
      sort: "year",
    })
  } catch (error) {
    console.error(error)
    return []
  }
}

export default async function ItemDetailPage({
  params: { id },
}: {
  params: { id: string }
}) {
  const user = await getUserFromCookies()
  const allowed = user?.roles.includes("fm")
  const item = await getItemById(id)
  const budgets = await getItemBudgets(id)

  if (!item) {
    redirect("/items")
  }

  return (
    <Container>
      <PageHeader title={item.name} showBackButton>
        <div className="flex flex-1 items-center justify-end">
          <Link href={`/items/${id}/edit`}>تعديل</Link>
        </div>
      </PageHeader>
      <div className="aspect-[5/1] border rounded-lg p-4">...</div>
      <div className="aspect-[5/1] border rounded-lg p-4">...</div>
      <div className="flex items-center justify-between">
        <div className="grid gap-1">
          <h3>إدارة الميزانيات للبند</h3>
          <p>يمكنك اضافة الميزانيات بالبند من هنا</p>
        </div>
        {allowed && <AddBudget itemId={id} />}
      </div>
      <BudgetsTable budgets={budgets} />
    </Container>
  )
}
