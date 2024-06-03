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

export function TenderType({
  defaultValue = "",
  placeholder = "اختر نوع المنافسة",
}: {
  defaultValue?: string
  placeholder?: string
}) {
  const types = ["منافسة عامة", "منافسة محدودة", "شراء مباشر", "اتفاقية إطارية"]

  return (
    <Select name="type" defaultValue={defaultValue}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>نوع المنافسة</SelectLabel>
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
