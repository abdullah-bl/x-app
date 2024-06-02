import { formatDate } from "~/lib/utils"
import UpdateTenderDetails from "~/components/forms/update-tender"
import {
  Table,
  TableCaption,
  TableHeader,
  TableRow,
  TableBody,
  TableHead,
  TableCell,
} from "~/components/ui/table"
import client from "~/lib/client"
import { Project, TenderDetail } from "~/types"

const getProjectTender = async (id: string) => {
  try {
    return await client
      .collection("tenders")
      .getFirstListItem<TenderDetail>(`project="${id}"`)
  } catch (error) {
    console.log(error)
    return undefined
  }
}

export default async function TenderDetails({ project }: { project: Project }) {
  return (
    <div className="grid gap-2 w-full">
      <div className="flex items-center justify-between">
        <h3 className="text-lg">Tender Details</h3>
        <UpdateTenderDetails project={project} />
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 border rounded-md">
        <div className="flex flex-col gap-2 bg-zinc-100 dark:bg-zinc-900 p-2 w-full">
          <span className="font-medium">Number</span>
        </div>
        <div className="flex flex-col gap-2 p-2 w-full">
          <span>{project?.tender?.number || "Not Set"}</span>
        </div>
        <div className="flex flex-col gap-2 bg-zinc-100 dark:bg-zinc-900 p-2 w-full">
          <span className="font-medium">Reference</span>
        </div>
        <div className="flex flex-col gap-2 p-2 w-full">
          <span>{project?.tender?.reference || "Not Set"}</span>
        </div>
        <div className="flex flex-col gap-2 bg-zinc-100 dark:bg-zinc-900 p-2 w-full">
          <span className="font-medium">Submission Date</span>
        </div>
        <div className="flex flex-col gap-2 p-2 w-full">
          <span>{formatDate(project?.tender?.submissionDate)}</span>
        </div>
        <div className="flex flex-col gap-2 bg-zinc-100 dark:bg-zinc-900 p-2 w-full">
          <span className="font-medium">Last Offer Presentation</span>
        </div>
        <div className="flex flex-col gap-2 p-2 w-full">
          <span>{formatDate(project?.tender?.lastOfferPresentationDate)}</span>
        </div>
        <div className="flex flex-col gap-2 bg-zinc-100 dark:bg-zinc-900 p-2 w-full">
          <span className="font-medium">Offers Opening Date</span>
        </div>
        <div className="flex flex-col gap-2 p-2 w-full">
          <span>{formatDate(project?.tender?.offersOpeningDate)}</span>
        </div>
        <div className="flex flex-col gap-2 bg-zinc-100 dark:bg-zinc-900 p-2 w-full">
          <span className="font-medium">Awarded Date</span>
        </div>
        <div className="flex flex-col gap-2 p-2 w-full">
          <span>{formatDate(project?.tender?.awardedDate)}</span>
        </div>
        <div className="flex flex-col gap-2 bg-zinc-100 dark:bg-zinc-900 p-2 w-full">
          <span className="font-medium">Duration</span>
        </div>
        <div className="flex flex-col gap-2 p-2 w-full">
          <span>{project?.tender?.duration || "0"} months</span>
        </div>
        <div className="flex flex-col gap-2 bg-zinc-100 dark:bg-zinc-900 p-2 w-full">
          <span className="font-medium">Type</span>
        </div>
        <div className="flex flex-col gap-2 p-2 w-full">
          <span>{project?.tender?.type || "Not Set"}</span>
        </div>
      </div>
    </div>
  )
}
