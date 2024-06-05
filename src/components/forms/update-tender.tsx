"use client"

import { useActionState, useEffect, useState } from "react"

import { toast } from "sonner"
import { DatePicker } from "../custom/date-picker"
import { Project } from "~/types"
import { Button } from "../ui/button"

import { Label } from "../ui/label"
import { Input } from "../ui/input"
import { updateProject, updateProjectTender } from "~/actions/projects"
import { CheckIcon, Pencil1Icon } from "@radix-ui/react-icons"
import { TenderType } from "../custom/tenderType"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog"

export default function UpdateTenderDetails({ project }: { project: Project }) {
  const [open, setOpen] = useState(false)

  const [submissionDate, setSubmissionDate] = useState<Date | undefined>(
    project?.submissionDate ? new Date(project.submissionDate) : new Date()
  )

  const [lastOfferPresentationDate, setLastOfferPresentationDate] = useState<
    Date | undefined
  >(
    project?.lastOfferPresentationDate
      ? new Date(project.lastOfferPresentationDate)
      : new Date()
  )

  const [offersOpeningDate, setOffersOpeningDate] = useState<Date | undefined>(
    project?.offersOpeningDate
      ? new Date(project.offersOpeningDate)
      : new Date()
  )

  const [awardedDate, setAwardedDate] = useState<Date | undefined>(
    project?.awardedDate ? new Date(project.awardedDate) : new Date()
  )

  const [state, formAction] = useActionState(updateProject, {
    success: false,
    message: "",
  })

  useEffect(() => {
    if (state.success === true) {
      toast.success(state.message)
      setOpen(false)
    } else if (state?.success === false && state.message) {
      toast.error(state.message)
    }
  }, [state])

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="expandIcon" Icon={Pencil1Icon} iconPlacement="left">
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update Tender Details</DialogTitle>
          <DialogDescription>
            Update tender details for this project
          </DialogDescription>
        </DialogHeader>
        <form className="grid gap-2 " action={formAction}>
          <input type="hidden" name="id" value={project.id} />
          <div className="grid grid-cols-2 gap-1  align-middle">
            <Label htmlFor="number">Number</Label>
            <Input
              type="text"
              id="number"
              name="number"
              defaultValue={project?.number}
              placeholder="Tender Number e.g. 1234/24"
            />
            <Label htmlFor="reference">Reference</Label>
            <Input
              type="text"
              id="reference"
              name="reference"
              placeholder="Reference Number e.g. 1234567890"
              defaultValue={project?.reference}
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
            <DatePicker
              date={offersOpeningDate}
              setDate={setOffersOpeningDate}
            />
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
              defaultValue={project?.duration}
              placeholder="Duration in months"
            />

            <Label htmlFor="type">Tender Type</Label>
            <TenderType defaultValue={project?.type} />
          </div>
          <Button
            type="submit"
            variant="expandIcon"
            Icon={CheckIcon}
            iconPlacement="left"
          >
            {state?.success === true ? "Updated!" : "Update Details"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
