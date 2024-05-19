"use client"

import { useSearchParams } from "next/navigation"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectItem,
} from "../ui/select"

export default function ProjectsFilter() {
  const searchParams = useSearchParams()
  return (
    <form method="get" className="grid gap-2">
      <Input
        type="search"
        name="q"
        placeholder="Search..."
        defaultValue={searchParams.get("q") || ""}
      />

      <Select name="status" defaultValue={searchParams.get("status") || ""}>
        <SelectTrigger className="">
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Status</SelectLabel>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="inactive">Inactive</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>

      <Select name="sort" defaultValue={searchParams.get("sort") || "-updated"}>
        <SelectTrigger className="">
          <SelectValue placeholder="Sort By" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Sort By</SelectLabel>
            <SelectItem value="-updated">Recently updated</SelectItem>
            <SelectItem value="updated">Least updated</SelectItem>
            <SelectItem value="created">Recently created</SelectItem>
            <SelectItem value="cost"> Lowest cost</SelectItem>
            <SelectItem value="-cost">Highest cost</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>

      <Button type="submit" size="sm">
        Filter
      </Button>
    </form>
  )
}
