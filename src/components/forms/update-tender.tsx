"use client"

import { useActionState, useEffect, useState } from "react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select"
import { toast } from "sonner"
import { DatePicker } from "../custom/date-picker"
import { Project, Status, TenderDetail } from "~/types"
import { Button } from "../ui/button"

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "~/components/ui/sheet"

import { Label } from "../ui/label"
import { Input } from "../ui/input"
import { updateProjectTender } from "~/actions/projects"
import { Pencil1Icon } from "@radix-ui/react-icons"

export default function UpdateTenderDetails({ project }: { project: Project }) {
  const [open, setOpen] = useState(false)

  const [submissionDate, setSubmissionDate] = useState<Date | undefined>(
    new Date(project?.tender?.submissionDate ?? new Date())
  )

  const [lastOfferPresentationDate, setLastOfferPresentationDate] = useState<
    Date | undefined
  >(new Date(project?.tender?.lastOfferPresentationDate ?? new Date()))

  const [offersOpeningDate, setOffersOpeningDate] = useState<Date | undefined>(
    new Date(project?.tender?.offersOpeningDate ?? new Date())
  )

  const [awardedDate, setAwardedDate] = useState<Date | undefined>(
    new Date(project?.tender?.awardedDate ?? new Date())
  )

  const [state, formAction] = useActionState(updateProjectTender, {
    success: false,
    message: "",
  })

  useEffect(() => {
    if (state?.success) {
      toast.success(state.message)
      setOpen(false)
    } else if (state?.message) {
      toast.error(state.message)
    }
  }, [state])

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" className="gap-2">
          <Pencil1Icon /> Edit
        </Button>
      </SheetTrigger>
      <SheetContent className="sm:max-w-[425px]">
        <SheetHeader>
          <SheetTitle>Update Tender Details</SheetTitle>
          <SheetDescription>
            Update tender details for this project
          </SheetDescription>
        </SheetHeader>
        <form className="grid gap-2 p-4 rounded-lg" action={formAction}>
          <input type="hidden" name="project" value={project.id} />
          <Label htmlFor="number">Number</Label>
          <Input
            type="text"
            id="number"
            name="number"
            defaultValue={project?.tender?.number}
            placeholder="Tender Number e.g. 1234/24"
          />
          <Label htmlFor="reference">Reference</Label>
          <Input
            type="text"
            id="reference"
            name="reference"
            placeholder="Reference Number e.g. 1234567890"
            defaultValue={project?.tender?.reference}
            min={0}
            maxLength={10}
          />
          <Label htmlFor="submissionDate">Submission Date</Label>
          <DatePicker date={submissionDate} setDate={setSubmissionDate} />
          <input
            type="hidden"
            name="submissionDate"
            defaultValue={submissionDate?.toDateString()}
          />

          <Label htmlFor="lastOfferPresentationDate">
            Last Offer Presentation Date
          </Label>
          <DatePicker
            date={lastOfferPresentationDate}
            setDate={setLastOfferPresentationDate}
          />
          <input
            type="hidden"
            name="lastOfferPresentationDate"
            defaultValue={lastOfferPresentationDate?.toDateString()}
          />

          <Label htmlFor="offersOpeningDate">Offers Opening Date</Label>
          <DatePicker date={offersOpeningDate} setDate={setOffersOpeningDate} />
          <input
            type="hidden"
            name="offersOpeningDate"
            defaultValue={offersOpeningDate?.toDateString()}
          />

          <Label htmlFor="awardedDate">Awarded Date</Label>
          <DatePicker date={awardedDate} setDate={setAwardedDate} />
          <input
            type="hidden"
            name="awardedDate"
            defaultValue={awardedDate?.toDateString()}
          />

          <Label htmlFor="duration">Duration</Label>
          <Input
            id="duration"
            type="number"
            name="duration"
            min={0}
            defaultValue={project?.tender?.duration}
            placeholder="Duration in months"
          />

          <Label htmlFor="type">Type</Label>
          <Select name="type" defaultValue={project.tender?.type}>
            <SelectTrigger>
              <SelectValue placeholder="Select a type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="منافسة العامة">منافسة العامة</SelectItem>
              <SelectItem value="منافسة محدودة">منافسة محدودة</SelectItem>
              <SelectItem value="الشراء المباشر">شراء المباشر</SelectItem>
              <SelectItem value="الاتفاقية الإطارية">
                اتفاقية الإطارية
              </SelectItem>
            </SelectContent>
          </Select>

          <Button type="submit">
            {state?.success ? "Updated" : "Save & Update"}
          </Button>
        </form>
      </SheetContent>
    </Sheet>
  )
}
