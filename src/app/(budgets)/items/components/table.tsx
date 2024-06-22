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
import { formatDate } from "~/lib/utils"
import { Item } from "~/types"

export function ItemsTable({ items }: { items: Item[] }) {
  return (
    <Table className="border">
      <TableCaption>قائمة بجميع البنود المتاحة</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="">#</TableHead>
          <TableHead>اسم البند</TableHead>
          <TableHead>نوع البند</TableHead>
          <TableHead>التصنيف الاقتصادي</TableHead>
          <TableHead>رقم البند</TableHead>
          <TableHead>الملاحظات</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {items?.map((item, i) => (
          <TableRow key={item.id}>
            <TableCell className="">{i + 1}</TableCell>
            <TableCell>
              <Link href={`/items/${item.id}`}>{item.name}</Link>
            </TableCell>
            <TableCell>{item.type}</TableCell>
            <TableCell>{item.reference}</TableCell>
            <TableCell>{item.number}</TableCell>
            <TableCell>{item.note}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
