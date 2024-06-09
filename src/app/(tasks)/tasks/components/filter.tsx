"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import { Button } from "~/components/ui/button"
import { Calendar } from "~/components/ui/calendar"

export const dynamic = "force-dynamic"

export default function FilterTasks() {
  const search = useSearchParams()
  const router = useRouter()
  const [date, setDate] = useState<Date | undefined>(
    search.get("due") ? new Date(search.get("due") as string) : new Date()
  )

  useEffect(() => {
    if (!date) return
    // due date 2022-01-01T00:00:00.000Z => 2022-01-01
    router.push(`?due=${date.toISOString().split("T")[0]}`)
  }, [date, router, search])

  return (
    <div className="flex-1 flex flex-col gap-4 w-full">
      <div className="flex items-center justify-between">
        <h3 className="text-lg text-center w-full">
          Today ({new Date().toDateString()})
        </h3>
      </div>
      <div className="flex-1 py-2">
        <div className="w-full">
          <Calendar
            selected={date}
            onSelect={setDate}
            mode="single"
            className="w-full"
          />
        </div>
      </div>
    </div>
  )
}
