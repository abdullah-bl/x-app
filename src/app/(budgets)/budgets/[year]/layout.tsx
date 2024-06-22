import { ArrowLeftIcon, ArrowRightIcon } from "@radix-ui/react-icons"
import Link from "next/link"
import Container from "~/components/layout/container"
import { PageHeader } from "~/components/layout/header"

export default function Layout({
  children,
  params: { year, ...rest },
}: {
  children: React.ReactNode
  params: { year: string }
}) {
  console.log(rest)
  return (
    <Container>
      <PageHeader title={`ميزانية (${year})`}>
        <div className="flex-1 flex items-center justify-end gap-1 ">
          <Link
            href={`/budgets/${parseInt(year) - 1}`}
            className="p-2 px-4 rounded-lg hover:bg-zinc-100 hover:dark:bg-zinc-900"
          >
            <ArrowRightIcon /> {parseInt(year) - 1}
          </Link>
          <Link
            href={`/budgets/${parseInt(year) + 1}`}
            className="p-2 px-4 rounded-lg hover:bg-zinc-100 hover:dark:bg-zinc-900"
          >
            <ArrowLeftIcon /> {parseInt(year) + 1}
          </Link>
        </div>
      </PageHeader>
      {children}
    </Container>
  )
}
