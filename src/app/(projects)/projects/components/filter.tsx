"use client"

import { useSearchParams } from "next/navigation"
import { Button } from "~/components/ui/button"
import { Input } from "~/components/ui/input"
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectItem,
} from "~/components/ui/select"
import { useEffect, useState } from "react"
import { Status } from "~/types"
import { useRouter } from "next/navigation"
import { DateRange } from "react-day-picker"
import { DatePickerWithRange } from "~/components/custom/date-picker-range"
import { TenderType } from "~/components/custom/tenderType"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog"
import { MixIcon } from "@radix-ui/react-icons"

export default function Filter() {
  const searchParams = useSearchParams()
  const router = useRouter()

  const [date, setDate] = useState<DateRange | undefined>({
    from: searchParams.get("min_created")
      ? new Date(searchParams.get("min_created") as string)
      : undefined,
    to: searchParams.get("max_created")
      ? new Date(searchParams.get("max_created") as string)
      : undefined,
  })
  const [statuses, setStatuses] = useState<Status[]>([]) // [Status]

  useEffect(() => {
    getStatuses()
  }, [])

  const getStatuses = async () => {
    const response = await fetch("/api/statuses", { cache: "force-cache" })
    const { statuses } = await response.json()
    setStatuses(statuses)
    // push empty value to statuses
    statuses.unshift({ id: " ", name: "All" })
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="expandIcon"
          size="sm"
          iconPlacement="right"
          Icon={MixIcon}
        >
          تصفية
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>تصفية المشاريع</DialogTitle>
          <DialogDescription>
            تصفية المشاريع حسب الاسم، التكلفة، الحالة، التاريخ، والمزيد.{" "}
          </DialogDescription>
        </DialogHeader>
        <form method="get" className="flex flex-col gap-2 w-full flex-1">
          <Input
            type="search"
            name="q"
            placeholder="Search..."
            defaultValue={searchParams.get("q") || ""}
          />

          <div className="flex items-center gap-2">
            <Input
              type="number"
              name="cost_min"
              placeholder="Min Cost"
              defaultValue={searchParams.get("cost_min") || ""}
            />
            <Input
              type="number"
              name="cost_max"
              placeholder="Max Cost"
              defaultValue={searchParams.get("cost_max") || ""}
            />
          </div>

          {/* <DatePickerWithRange date={date} setDate={setDate} /> */}
          <DatePickerWithRange date={date} setDate={setDate} />

          <input
            hidden
            type="text"
            name="min_created"
            defaultValue={date?.from?.toDateString()}
          />
          <input
            hidden
            type="text"
            name="max_created"
            defaultValue={date?.to?.toDateString()}
          />

          <Select defaultValue={searchParams.get("status") || ""} name="status">
            <SelectTrigger className="">
              <SelectValue placeholder="Filter By Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>تصفي بالحالة</SelectLabel>
                {statuses.map((status) => (
                  <SelectItem key={status.id} value={status.id}>
                    {status.name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>

          <Select
            name="sort"
            defaultValue={searchParams.get("sort") || "-updated"}
          >
            <SelectTrigger className="">
              <SelectValue placeholder="Sort By" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>رت حسب</SelectLabel>
                <SelectItem value="-updated">Recently updated</SelectItem>
                <SelectItem value="updated">Least updated</SelectItem>
                <SelectItem value="created">Recently created</SelectItem>
                <SelectItem value="cost"> الأقل تكلفة</SelectItem>
                <SelectItem value="-cost">الأعلى تكلفة</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <TenderType
            defaultValue={searchParams.get("tender_type") || ""}
            placeholder="Filter By Tender Type"
          />
          <div className="flex items-center gap-2">
            <Button type="submit" size="sm" className="w-full">
              تصفية
            </Button>

            <Button
              type="reset"
              size="sm"
              variant={"outline"}
              onClick={() => {
                router.push("/projects")
              }}
            >
              إزل التصفية
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
