import { Label } from "../ui/label"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select"

export function ItemType({
  defaultValue = "",
  placeholder = "اختر نوع البند",
}: {
  defaultValue?: string
  placeholder?: string
}) {
  const types = ["مصروفات عامة", "برنامج", "مشروع", "اتفاقية إطارية", "اخرى"]

  return (
    <Select name="type" defaultValue={defaultValue}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>نوع البند</SelectLabel>
          {types.map((type) => (
            <SelectItem key={type} value={type}>
              {type}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
