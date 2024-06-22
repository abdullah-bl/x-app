import Container from "~/components/layout/container"
import { PageHeader } from "~/components/layout/header"
import client from "~/lib/client"
import { ItemsTable } from "./components/table"
import Link from "next/link"
import { Item } from "~/types"
import { getUserFromCookies } from "~/lib/auth"

export const getItems = async () => {
  try {
    await getUserFromCookies()
    return await client.collection("items").getFullList<Item>({
      sort: "-number",
    })
  } catch (error) {
    return []
  }
}

export default async function Items() {
  const items = await getItems()
  return (
    <Container>
      <PageHeader title="البنود">
        <div className="flex flex-1 justify-end items-center py-2">
          <Link href="/items/new">+ إضافة بند جديد</Link>
        </div>
      </PageHeader>
      <div className="grid gap-4">
        <div className="grid gap-0">
          <h3 className="font-medium text-lg"> إستعراض جميع البنود </h3>
          <p className="text-sm">
            يمكنك إضافة بنود جديدة أو تعديل البنود الحالية من هنا
          </p>
        </div>
        <ItemsTable items={items} />
      </div>
    </Container>
  )
}
