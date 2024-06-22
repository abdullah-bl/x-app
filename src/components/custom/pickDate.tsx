"use client"

import { useState } from "react"
import { Label } from "../ui/label"
import { DatePicker } from "./date-picker"

export const PickDate = ({
  name,
  id,
  defaultValue,
  label,
}: {
  name: string
  id: string
  defaultValue?: string
  label: string
}) => {
  const [date, setData] = useState<Date | undefined>(
    defaultValue ? new Date(defaultValue) : undefined
  )
  return (
    <div className="grid gap-2">
      <Label htmlFor={id}>{label}</Label>
      <input
        hidden
        type="date"
        id={id}
        name={name}
        defaultValue={date?.toISOString().split("T")[0]}
      />
      <DatePicker date={date} setDate={setData} />
    </div>
  )
}
