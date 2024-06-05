import { formatDate } from "~/lib/utils"
import UpdateTenderDetails from "~/components/forms/update-tender"
import { Project } from "~/types"

export default async function TenderDetails({ project }: { project: Project }) {
  return (
    <div className="grid gap-2 w-full">
      <div className="flex items-center justify-between ">
        <h3 className="font-medium">Tender Details</h3>
        <UpdateTenderDetails project={project} />
      </div>
      <div className="grid sm:grid-cols-2 md:grid-cols-4 border rounded-md">
        <div className="flex flex-col gap-2 bg-zinc-100 dark:bg-zinc-900 p-2 w-full">
          <span className="font-medium">Number</span>
        </div>
        <div className="flex flex-col gap-2 p-2 w-full">
          <span>{project?.number || "Not Set"}</span>
        </div>
        <div className="flex flex-col gap-2 bg-zinc-100 dark:bg-zinc-900 p-2 w-full">
          <span className="font-medium">Reference</span>
        </div>
        <div className="flex flex-col gap-2 p-2 w-full">
          <span>{project?.reference || "Not Set"}</span>
        </div>
        <div className="flex flex-col gap-2 bg-zinc-100 dark:bg-zinc-900 p-2 w-full">
          <span className="font-medium">Submission Date</span>
        </div>
        <div className="flex flex-col gap-2 p-2 w-full">
          <span>{formatDate(project?.submissionDate)}</span>
        </div>
        <div className="flex flex-col gap-2 bg-zinc-100 dark:bg-zinc-900 p-2 w-full">
          <span className="font-medium">Last Offer Presentation</span>
        </div>
        <div className="flex flex-col gap-2 p-2 w-full">
          <span>{formatDate(project?.lastOfferPresentationDate)}</span>
        </div>
        <div className="flex flex-col gap-2 bg-zinc-100 dark:bg-zinc-900 p-2 w-full">
          <span className="font-medium">Offers Opening Date</span>
        </div>
        <div className="flex flex-col gap-2 p-2 w-full">
          <span>{formatDate(project?.offersOpeningDate)}</span>
        </div>
        <div className="flex flex-col gap-2 bg-zinc-100 dark:bg-zinc-900 p-2 w-full">
          <span className="font-medium">Awarded Date</span>
        </div>
        <div className="flex flex-col gap-2 p-2 w-full">
          <span>{formatDate(project?.awardedDate)}</span>
        </div>
        <div className="flex flex-col gap-2 bg-zinc-100 dark:bg-zinc-900 p-2 w-full">
          <span className="font-medium">Duration</span>
        </div>
        <div className="flex flex-col gap-2 p-2 w-full">
          <span>{project?.duration || "0"} months</span>
        </div>
        <div className="flex flex-col gap-2 bg-zinc-100 dark:bg-zinc-900 p-2 w-full">
          <span className="font-medium">Type</span>
        </div>
        <div className="flex flex-col gap-2 p-2 w-full">
          <span>{project?.type || "Not Set"}</span>
        </div>
      </div>
    </div>
  )
}
